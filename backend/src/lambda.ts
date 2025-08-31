import { NestFactory } from "@nestjs/core";
import serverlessExpress from "@codegenie/serverless-express";
import {
  Callback,
  Context,
  Handler,
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from "aws-lambda";
import { AppModule } from "./app.module";

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: APIGatewayProxyEventV2,
  context: Context,
  callback: Callback,
): Promise<Handler | APIGatewayProxyResultV2> => {
  try {
    server = await bootstrap();
  } catch (error) {
    console.error("Bootstrap failed:", error);
    return {
      headers: {},
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
  return server(event, context, callback);
};
