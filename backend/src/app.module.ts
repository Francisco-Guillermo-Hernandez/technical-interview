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
import { CatalogsModule } from './catalogs/catalogs.module';
import authConfig from './auth.config';
import emailerConfig from './emailer.config';
import { EmailerModule } from './emailer/emailer.module';
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [configuration, databaseConfig, authConfig, emailerConfig]
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
    CatalogsModule,
    EmailerModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('emailerConfig') as MailerOptions
      }),
      inject: [ConfigService]
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
