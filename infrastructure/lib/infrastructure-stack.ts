import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  LambdaIntegration,
  RestApi,
  LambdaRestApi,
} from 'aws-cdk-lib/aws-apigateway';
import { Runtime, Code, Function } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';
import { Cors } from 'aws-cdk-lib/aws-apigateway';
import { Distribution } from 'aws-cdk-lib/aws-cloudfront';
import { S3StaticWebsiteOrigin } from 'aws-cdk-lib/aws-cloudfront-origins';
import {
  Bucket,
  BucketEncryption,
  BlockPublicAccess,
} from 'aws-cdk-lib/aws-s3';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as iam from 'aws-cdk-lib/aws-iam';
import {
  BucketDeployment,
  Source,
  CacheControl,
} from 'aws-cdk-lib/aws-s3-deployment';
import * as secrets from 'aws-cdk-lib/aws-secretsmanager';
import { env } from 'node:process';

const frontendDistribution = '../../frontend/out/';
const backendDistribution = '../../backend/dist/';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // const secret = secrets.Secret.fromSecretCompleteArn(
    //   this,
    //   'appSecrets',
    //   'arn:aws:secretsmanager:us-east-1:881490126186:secret:development-technical-interview-environments-X1PRks'
    // );

    const backendLambda = new Function(this, 'lambda-handler', {
      runtime: Runtime.NODEJS_22_X,
      handler: 'lambda.handler',
      code: Code.fromAsset(join(__dirname, backendDistribution)),
      memorySize: 256,
      timeout: cdk.Duration.minutes(1),
      environment: {
        MODE: 'production',
        MONGODB_URI_DEV: env.MONGODB_URI_DEV ?? '',
        EMAIL_USER: env.EMAIL_USER ?? '',
        EMAIL_PASS: env.EMAIL_PASS ?? '',
        EMAIL_PORT: env.EMAIL_PORT ?? '',
        EMAIL_HOST: env.EMAIL_HOST ?? '',
        DB_NAME: env.DB_NAME ?? '',
        PRIVATE_KEY: env.PRIVATE_KEY ?? '',
        PUBLIC_KEY: env.PUBLIC_KEY ?? '',
      },
    });

    // secret.grantRead(backendLambda);

    const api = new LambdaRestApi(this, 'delivery-api', {
      handler: backendLambda,
      proxy: true,
      defaultCorsPreflightOptions: {
        allowOrigins: ['*'], // only for demo purposes
        allowMethods: Cors.ALL_METHODS,
        allowHeaders: Cors.DEFAULT_HEADERS,
      },
    });

    const bucket = new Bucket(this, 'NextJsDistributionFrontendBucket', {
      enforceSSL: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Not for production
      encryption: BucketEncryption.S3_MANAGED,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
    });

    const cloudFrontDistribution = new Distribution(
      this,
      'NextJsCloudFrontDistribution',
      {
        defaultBehavior: {
          // origin: new S3StaticWebsiteOrigin(bucket),
          origin: new S3Origin(bucket),
          viewerProtocolPolicy:
            cdk.aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          allowedMethods:
            cdk.aws_cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
          // cachedMethods: cdk.aws_cloudfront.CachedMethods.CACHE_NONE,
        },
        httpVersion: cdk.aws_cloudfront.HttpVersion.HTTP2,
        defaultRootObject: 'index.html',
        errorResponses: [
          {
            httpStatus: 404,
            responseHttpStatus: 200,
            responsePagePath: '/404/index.html',
          },
        ],
      }
    );

    bucket.addToResourcePolicy(
      new PolicyStatement({
        actions: ['s3:GetObject'],
        resources: [`${bucket.bucketArn}/*`],
        principals: [new iam.ServicePrincipal('cloudfront.amazonaws.com')],
        conditions: {
          StringEquals: {
            'AWS:SourceArn': cloudFrontDistribution.distributionArn,
          },
        },
      })
    );

    new BucketDeployment(this, 'DeployFrontend', {
      sources: [Source.asset(join(__dirname, frontendDistribution))],
      destinationBucket: bucket,
      distribution: cloudFrontDistribution,
      distributionPaths: ['/*'],
      cacheControl: [
        CacheControl.setPublic(),
        CacheControl.maxAge(cdk.Duration.days(1)),
        CacheControl.sMaxAge(cdk.Duration.days(1)),
      ],
    });

    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
    });

    new cdk.CfnOutput(this, 'FrontendUrl', {
      value: cloudFrontDistribution.domainName,
    });
  }
}
