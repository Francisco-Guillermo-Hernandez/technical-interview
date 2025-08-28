import { Controller, Post, Body, Get, Query, Param, Patch } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { Package } from '../../entities/Package.entity';
import { ObjIds, GenericPaginator } from '../../types/generic';

@Controller('delivery/packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Post()
  async insertMany(
    @Body() packages: Partial<Package>[]
  ): Promise<ObjIds> {
    return this.packagesService.insertMany(packages);
  }

  @Get()
  async paginate(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
    @Query('status') status?: string,
    @Query('deliveryDateFrom') deliveryDateFrom?: string,
    @Query('deliveryDateTo') deliveryDateTo?: string,
    @Query('createdAtFrom') createdAtFrom?: string,
    @Query('createdAtTo') createdAtTo?: string,
    @Query('packageId') packageId?: string,
    @Query('userId') userId?: string
  ): Promise<GenericPaginator<Package>> {
    const filters = {
      packageId: packageId || undefined,  
      status: status || undefined,
      deliveryDateFrom: deliveryDateFrom ? new Date(deliveryDateFrom) : undefined,
      deliveryDateTo: deliveryDateTo ? new Date(deliveryDateTo) : undefined,
      createdAtFrom: createdAtFrom ? new Date(createdAtFrom) : undefined,
      createdAtTo: createdAtTo ? new Date(createdAtTo) : undefined,
      userId: userId || undefined
    };
    
    return this.packagesService.paginate(page, limit, filters);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string
  ): Promise<{ affected: number }> {
    return this.packagesService.updateStatus(id, status);
  }

  @Patch('batch-status')
  async batchUpdateStatus(
    @Body('ids') ids: string[],
    @Body('status') status: string
  ): Promise<{ affected: number }> {
    return this.packagesService.updateStatus(ids, status);
  }
}
