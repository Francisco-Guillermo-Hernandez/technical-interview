import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, In } from 'typeorm';
import { Package } from '../../entities/Package.entity';
import { GenericPaginator, ObjIds } from '../../types/generic';
import { getId } from '../../utils/others';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Package)
    private packageRepository: Repository<Package>,
  ) {}

  async insertMany(packages: Partial<Package>[]): Promise<ObjIds> {
    const savedPackages = await this.packageRepository.save(packages);
    if (savedPackages) {
      return {
      ObjectId: savedPackages.map(pkg => pkg._id)
    };
    }
    
    throw new BadRequestException('')
  }

  async paginate(
    page: number = 1,
    limit: number = 5,
    filters?: {
      packageId?: string;
      status?: string;
      deliveryDateFrom?: Date;
      deliveryDateTo?: Date;
      createdAtFrom?: Date;
      createdAtTo?: Date;
      userId?: string;
    }
  ): Promise<GenericPaginator<Package>> {

    const actualLimit = Math.min(Math.max(limit, 5), 10);
    const actualPage = Math.max(page, 1);
    const skip = (actualPage - 1) * actualLimit;
    const findOptions: FindManyOptions<Package> = {
      skip,
      take: actualLimit,
      order: {
        createdAt: 'DESC'
      }
    };

    if (filters) {
      const whereCondition: any = {};

      if (filters.packageId) {
        whereCondition._id = getId(filters.packageId)
      }
      
      if (filters.status) {
        whereCondition.status = filters.status;
      }
      
      if (filters.userId) {
        whereCondition.userId = filters.userId;
      }
      
      if (filters.deliveryDateFrom || filters.deliveryDateTo) {
        whereCondition.deliveryDate = {};
        if (filters.deliveryDateFrom) {
          // @ts-ignore
            (whereCondition.deliveryDate as any).gte = filters.deliveryDateFrom;
        }
        if (filters.deliveryDateTo) {
            // @ts-ignore
          (whereCondition.deliveryDate as any).lte = filters.deliveryDateTo;
        }
      }
      
      if (filters.createdAtFrom || filters.createdAtTo) {
        whereCondition.createdAt = {};
        if (filters.createdAtFrom) {
            // @ts-ignore
          (whereCondition.createdAt as any).gte = filters.createdAtFrom;
        }
        if (filters.createdAtTo) {
            // @ts-ignore
          (whereCondition.createdAt as any).lte = filters.createdAtTo;
        }
      }
      
      findOptions.where = whereCondition;
    }

    const [data, total] = await this.packageRepository.findAndCount(findOptions);

    const totalPages = Math.ceil(total / actualLimit);
    
    return {
      data,
      total,
      page: actualPage,
      totalPages,
      hasNext: actualPage < totalPages,
      hasPrev: actualPage > 1
    };
  }

  async updateStatus(
    ids: string | string[],
    status: string
  ): Promise<{ affected: number }> {
    const idArray = Array.isArray(ids) ? ids : [ids];
    
    const result = await this.packageRepository.update(
      { _id: In(idArray) },
      { status }
    );
    
    return {
      affected: result.affected || 0
    };
  }

  async findOne(id: string): Promise<Package | null> {
    return await this.packageRepository.findOne({
      where: { _id: getId(id ?? '') }
    });
  }

  async findByIds(ids: string[]): Promise<Package[]> {
    return await this.packageRepository.find({
      where: { _id: In(ids) }
    });
  }
}
