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
const backendDistribution = '../../backend/production/lambda.zip';
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
      timeout: cdk.Duration.minutes(2),
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

    const advancedUrlRewriteFunction = new cloudfront.Function(
      this,
      'AdvancedUrlRewriteFunction',
      {
        functionName: 'nextjs-advanced-url-rewrite',
        code: cloudfront.FunctionCode.fromInline(`
    function handler(event) {
      var request = event.request;
      var uri = request.uri;
      
      // Don't rewrite requests for static assets
      if (uri.match(/\\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|map)$/)) {
        return request;
      }
      
      // Don't rewrite API routes
      if (uri.startsWith('/api/')) {
        return request;
      }
      
      // Handle Next.js _next static files
      if (uri.startsWith('/_next/')) {
        return request;
      }
      
      // For root path
      if (uri === '/') {
        request.uri = '/index.html';
        return request;
      }
      
      // For paths ending with slash, append index.html
      if (uri.endsWith('/')) {
        request.uri = uri + 'index.html';
        return request;
      }
      
      // For paths without extension, try to append /index.html
      if (!uri.includes('.')) {
        request.uri = uri + '/index.html';
        return request;
      }
      
      return request;
    }
  `),
        comment: 'Advanced URL rewrite function for Next.js static export',
      }
    );

    const urlRewriteFunction = new cloudfront.Function(
      this,
      'UrlRewriteFunction',
      {
        functionName: 'nextjs-url-rewrite',
        code: cloudfront.FunctionCode.fromInline(`
        function handler(event) {
          var request = event.request;
          var uri = request.uri;
          
          // Check if the URI ends with a slash or has no file extension
          if (uri.endsWith('/')) {
            // For paths ending with /, append index.html
            request.uri = uri + 'index.html';
          } else if (!uri.includes('.') && !uri.endsWith('/')) {
            // For paths without extension and not ending with /, append /index.html
            request.uri = uri + '/index.html';
          }
          
          return request;
        }
      `),
        comment: 'URL rewrite function for Next.js static export',
      }
    );

    //  const originAccessControl = new cloudfront.OriginAccessControl(this, 'OAC', {
    //   description: 'OAC for Next.js static website',
    // });

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
          functionAssociations: [
            {
              function: urlRewriteFunction,
              eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
            },
          ],
        },
        httpVersion: cdk.aws_cloudfront.HttpVersion.HTTP2,
        defaultRootObject: '/index.html',
        errorResponses: [
          {
            httpStatus: 403,
            responseHttpStatus: 200,
            responsePagePath: '/403/index.html',
            ttl: cdk.Duration.minutes(1),
          },
          {
            httpStatus: 404,
            responseHttpStatus: 200,
            responsePagePath: '/404/index.html',
          },
        ],
        additionalBehaviors: {
          '/auth': {
            origin: new S3Origin(bucket),
            viewerProtocolPolicy:
              cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            functionAssociations: [
              {
                function: new cloudfront.Function(this, 'RedirectAuth', {
                  code: cloudfront.FunctionCode.fromInline(`
            function handler(event) {
              var request = event.request;
              if (request.uri === "/auth") {
                return {
                  statusCode: 302,
                  statusDescription: "Found",
                  headers: { "location": { value: "/auth/login/" } }
                };
              }
              return request;
            }
          `),
                }),
                eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
              },
            ],
          },

          //       '/dashboard/client/': {
          //   origin: new S3Origin(bucket),
          //   viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          //   functionAssociations: [{
          //     function: new cloudfront.Function(this, 'RedirectAuth', {
          //       code: cloudfront.FunctionCode.fromInline(`
          //         function handler(event) {
          //           var request = event.request;
          //           if (request.uri === "/dashboard/client") {
          //             return {
          //               statusCode: 302,
          //               statusDescription: "Found",
          //               headers: { "location": { value: "/dashboard/" } }
          //             };
          //           }
          //           return request;
          //         }
          //       `),
          //     }),
          //     eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
          //   }],
          // },
        },
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
