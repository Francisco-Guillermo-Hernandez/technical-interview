import { Controller, Get,  Query, Post, Body, NotFoundException, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDto } from '../../dtos/order.dto';
import { Order } from '../../entities/Order.entity';
import { OrderPaginator } from '../../types/generic'

@Controller('delivery/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}


  @Post()
  async create(@Body() createOrderDto: OrderDto): Promise<Order | null> {
    return this.ordersService.create(createOrderDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Order> {
    const order = await this.ordersService.findOne(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5
  ): Promise<OrderPaginator> {
    return this.ordersService.findAll(page, limit);
  }
}
