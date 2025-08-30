import { registerAs } from '@nestjs/config';
import { env } from 'node:process';

export default registerAs('databaseConfig', () => ({
  type: 'mongodb',
  url: encodeURI(env?.MONGODB_URI_DEV ?? ''),
  database: process.env.DB_NAME || 'technical_interview',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  logging: true,
  autoLoadEntities: true,
}));
