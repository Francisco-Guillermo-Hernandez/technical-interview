import { PackageDto } from './package.dto';

export class OrderDto {

  deliveryAddress: string;


  directions: string;


  guideMark: string;

  deliveryDate: Date;


  firstLevel: number;


  secondLevel: number;
  
  thirdLevel: number;


  packages: Array<PackageDto>;

  userId: string;
}
