import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DeliveryModule } from './delivery/delivery.module';
import { TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import configuration from './environment';
import databaseConfig from './database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { JwtModule, JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';
import authConfig from './auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [configuration, databaseConfig, authConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        ...configService.get('databaseConfig') as TypeOrmModuleOptions
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    DeliveryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
