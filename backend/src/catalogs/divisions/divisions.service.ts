import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Division } from '../../entities/Division.entity';

@Injectable()
export class DivisionsService {

    constructor(
    @InjectRepository(Division)
    private divisionRepository: Repository<Division>) {}

     async findAll(): Promise<Division[]> {
    return await this.divisionRepository.find();
  }

  async findOneByName(name: string): Promise<Division | null> {
    const options: FindOneOptions<Division> = {
      where: { firstLevelName: name },
    };
    return await this.divisionRepository.findOne(options);
  }

  async findByFirstLevelName(firstLevelName: string): Promise<Division[]> {
    return await this.divisionRepository.find({
      where: { firstLevelName: firstLevelName },
    });
  }

}
