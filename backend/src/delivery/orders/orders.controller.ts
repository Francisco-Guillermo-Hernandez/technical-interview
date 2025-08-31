import { Controller, Get,  Query, Post, Body, NotFoundException, Param,UseGuards, Request } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDto } from '../../dtos/order.dto';
import { Order } from '../../entities/Order.entity';
import { OrderPaginator } from '../../types/generic'

import { JwtAuthGuard } from "../../auth/guards/jwt.guard";

@Controller('delivery/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}


  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createOrderDto: OrderDto,
    @Request() req: { user: { sub: string } }
  ): Promise<Order | null> {
    return this.ordersService.create({...createOrderDto, userId: req.user.sub, createdAt: new Date() });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Order> {
    const order = await this.ordersService.findOne(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
    @Request() req: { user: { sub: string } }
  ): Promise<OrderPaginator> {
    return this.ordersService.findAll(page, limit, req.user.sub);
  }
}
