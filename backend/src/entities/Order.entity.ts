import { Entity, Column, ObjectIdColumn, ManyToOne, ObjectId } from "typeorm";
import { Package } from "./Package.entity";
// import { User } from './User.entity';

@Entity("orders")
export class Order {
  @ObjectIdColumn()
  _id: ObjectId;

  get id(): string {
    return this._id.toHexString();
  }

  @Column({ type: "string", length: 150 })
  deliveryAddress: string;

  @Column({ type: "string", length: 150 })
  directions: string;

  @Column({ type: "string", length: 150 })
  instructions: string;

  @Column({ type: "date", nullable: true })
  deliveryDate: Date;

  /**
   *
   */
  @Column({ type: "number" })
  firstLevel: number;

  @Column({ type: "number" })
  secondLevel: number;

  @Column({ type: "number", nullable: true })
  thirdLevel: number;

  // @OneToMany(() => Package, pkg => pkg.id)
  @Column({ type: "json" })
  // @Column( type => Package)
  packages: Array<Package>;

  @Column({ type: "string" })
  firstName: string;

  @Column({ type: "string" })
  lastName: string;

  @Column({ type: "string" })
  phone: string;
  @Column({ type: "string" })
  email: string;

  // @ManyToOne(() => User, user => user.orders)
  // user: User;

  // @ManyToOne(() => User, user => user.orders)

  @Column({ type: "string", length: 150 })
  pickupAddress: string;

  @Column()
  userId: string;

  @Column({ type: "timestamp", nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
