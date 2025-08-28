import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';
// import { Order } from './Order.entity';

@Entity('packages')
export class Package {
  // @ObjectIdColumn()
  // id: string;
  @ObjectIdColumn()
  _id: ObjectId;
  @Column({ type: 'number' })
  length: number;
  @Column({ type: 'number' })
  height: number;
  @Column({ type: 'number' })
  width: number;
  @Column({ type: 'string', length: 50 })
  content: string;
  @Column({ type: 'number' })
  weight: number;
  // @ManyToOne(() => Order, order => order.pr)
  orderId: string;
  @Column({ type: 'varchar', length: 50, nullable: true })
  trackingNumber: string;

  @Column({ type: 'enum', enum: ['pending', 'shipped', 'delivered', 'returned'] })
  status: string; 

  @Column({ type: 'string', nullable: false })
  destinationAddress: string;

  @Column({ type: 'date', nullable: true })
  deliveryDate: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
