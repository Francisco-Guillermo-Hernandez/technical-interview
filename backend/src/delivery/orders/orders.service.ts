import { Injectable } from '@nestjs/common';
import { Order } from '../../entities/Order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// import { PackageDto } from '../../dtos/package.dto';
import { OrderDto } from '../../dtos/order.dto';
import { getId } from '../../utils/others';
import { OrderPaginator } from '../../types/generic'

@Injectable()
export class OrdersService {
    constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: OrderDto): Promise<Order | null> {
    const order = this.orderRepository.create(createOrderDto);
    return await this.orderRepository.save(order);
  }

  public async findOne(id: string): Promise<Order | null> {
    return await this.orderRepository.findOne({
      where: { _id: getId(id ?? '') },
      relations: ['user', 'packages']
    });
  }

  public async findAll(page: number = 1, limit: number = 5): Promise<OrderPaginator> {
    const actualLimit = Math.min(Math.max(limit, 1), 10);
    const actualPage = Math.max(page, 1);
    
    const skip = (actualPage - 1) * actualLimit;
    
    const [data, total] = await this.orderRepository.findAndCount({
      relations: ['user', 'products'],
      skip,
      take: actualLimit,
      order: {
        
      }
    });

    const totalPages = Math.ceil(total / actualLimit);
    
    return {
      orders: data,
      total,
      page: actualPage,
      totalPages,
      hasNext: actualPage < totalPages,
      hasPrev: actualPage > 1
    };
  }


  
}
