import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
    cors: true
  });
  app.enableCors({
  origin: ['http://localhost:3000', 'http://localhost:8000', 'https://d33kj2zo1rszhb.cloudfront.net/'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Access-Control-Allow-Origin'],
  credentials: true,
});

  await app.listen(process.env.PORT ?? 5050);
}
bootstrap().catch(console.error);
