import { Module } from "@nestjs/common";
import { OrdersController } from "./orders/orders.controller";
import { HistoryController } from "./history/history.controller";
import { OrdersService } from "./orders/orders.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "../entities/Order.entity";
import { Package } from "../entities/Package.entity";
import { PackagesService } from "./packages/packages.service";
import { PackagesController } from "./packages/packages.controller";
import { User } from "../entities/User.entity";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { ConfigService, ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): JwtModuleOptions => ({
        ...(configService.get("authConfig") as JwtModuleOptions),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Order, Package, User]),
  ],
  controllers: [OrdersController, HistoryController, PackagesController],
  providers: [OrdersService, PackagesService],
})
export class DeliveryModule {}
