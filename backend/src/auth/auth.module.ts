import { Module } from "@nestjs/common";
import { UserService } from "./user/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entities/User.entity";
import { AuthService } from "./auth/auth.service";
import { UserController } from "./user/user.controller";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { ConfigService, ConfigModule } from "@nestjs/config";
import { EmailService } from "../emailer/email/email.service";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): JwtModuleOptions => ({
        ...(configService.get("authConfig") as JwtModuleOptions),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, EmailService],
  exports: [UserService, TypeOrmModule],
})
export class AuthModule {}
