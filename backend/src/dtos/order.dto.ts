import { PackageDto } from "./package.dto";

export class OrderDto {
  deliveryAddress: string;

  directions: string;

  instructions: string;

  deliveryDate: Date;

  firstLevel: number;

  secondLevel: number;

  thirdLevel: number;

  packages: Array<PackageDto>;

  userId: string;

  pickupAddress: string;

  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  createdAt: Date;
}
