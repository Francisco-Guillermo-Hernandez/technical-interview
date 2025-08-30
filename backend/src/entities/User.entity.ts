import { Entity, Column, ObjectIdColumn, OneToMany, ObjectId } from "typeorm";
import { hash, compare } from "bcryptjs";
import { Order } from "./Order.entity";

@Entity("users")
export class User {
  // @PrimaryGeneratedColumn()
  // id: number;

  @ObjectIdColumn()
  _id: ObjectId;

  get id(): string {
    return this._id.toHexString();
  }

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ type: "enum", enum: ["male", "female", "other"] })
  gender: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ select: false })
  hashedPassword: string;

  @Column({ nullable: true, length: 20 })
  phone: string;

  @Column({ type: "enum", enum: ["client", "deliveryMan", "assistant"] })
  role: string;

  @Column({ type: "date", nullable: true })
  birthdate: Date;

  @Column({ type: "boolean" })
  isActive: boolean;

  @Column({ type: "string" })
  otp: string;

  async hashPassword(): Promise<void> {
    if (this.hashedPassword) {
      const saltRounds = 10;
      this.hashedPassword = await hash(this.hashedPassword, saltRounds);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return await compare(password, this.hashedPassword);
  }

  // @OneToMany(() => Order, order => order.userId)
  // orders: Array<Order>
}
