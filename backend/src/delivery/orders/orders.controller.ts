import { Controller, Get, Query, Post, Body, NotFoundException, Param, UseGuards, Request, } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrderDto } from "../../dtos/order.dto";
import { Order } from "../../entities/Order.entity";
import { OrderPaginator } from "../../types/generic";
import { OrderFilter } from "../../types/generic";
import { JwtAuthGuard } from "../../auth/guards/jwt.guard";

@Controller("delivery/orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createOrderDto: OrderDto,
    @Request() req: { user: { sub: string } },
  ): Promise<Order | null> {
    return this.ordersService.create({
      ...createOrderDto,
      userId: req.user.sub,
      createdAt: new Date(),
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Order> {
    const order = await this.ordersService.findOne(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Request() req: { user: { sub: string } },
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 5,
    @Query("from") from?: string,
    @Query("to") to?: string,
  ): Promise<OrderPaginator> {
    const filter: OrderFilter = {};
    if (from && to) {
      filter.range = {
        from: new Date(from),
        to: new Date(to),
      };
    }
    return this.ordersService.findAll(page, limit, req.user.sub, filter);
  }
}
