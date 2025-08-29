import { Module } from '@nestjs/common';
import { DivisionsController } from './divisions/divisions.controller';
import { DivisionsService } from './divisions/divisions.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Division } from '../entities/Division.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Division]),
  ],
  controllers: [DivisionsController],
  providers: [DivisionsService]
})
export class CatalogsModule {}
