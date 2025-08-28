import { Entity, Column, ObjectIdColumn, ManyToOne, ObjectId } from 'typeorm';
import { Package } from './Package.entity';
// import { User } from './User.entity';

@Entity('orders')
export class Order {

  @ObjectIdColumn()
  _id: ObjectId;

  get id(): string {
    return this._id.toHexString();
  }


  @Column({ type: 'string', length: 150 })
  deliveryAddress: string;

  @Column({ type: 'string', length: 150 })
  directions: string;

  @Column({ type: 'string', length: 150 })
  guideMark: string;

  @Column({ type: 'date', nullable: false })
  deliveryDate: Date;

  /**
   * 
   */
  @Column({ type: 'number' })
  firstLevel: number;

  @Column({ type: 'number' })
  secondLevel: number;

  @Column({ type: 'number' })
  thirdLevel: number;


  // @OneToMany(() => Package, pkg => pkg.id)
  @Column({ type: 'json' })
  // @Column( type => Package)
  packages: Array<Package>;

  // @ManyToOne(() => User, user => user.orders)
  // user: User;
  
  // @ManyToOne(() => User, user => user.orders)

  @Column()
  userId: string;
}
