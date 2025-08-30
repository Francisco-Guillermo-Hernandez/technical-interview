import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../entities/User.entity";
import { UserDTO } from "../../dtos/user.dto";
import { ActivateDTO } from '../../dtos/activation.dto';
import { getId } from '../../utils/others';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async create(userData: UserDTO): Promise<User> {
    const user = new User();
    const { password, ...remainingFields } = userData;
    Object.assign(user, {
      ...remainingFields,
      hashedPassword: password,
      role: "client",
    });
    await user.hashPassword();
    return this.usersRepository.save(user);
  }

  public async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  public async findOneById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  public async validateUser(
    email: string,
    password: string,
  ): Promise<Partial<User> | null> {
    const user = await this.findOneByEmail(email);
    if (user && (await user.validatePassword(password))) {
      // @ts-ignore
      const { hashedPassword, ...result } = user;
      return result;
    }

    return null;
  }

  public async activateAccount(activation: ActivateDTO): Promise<boolean> {
    const result = await this.usersRepository
    .update({ email: activation.email, _id: getId(activation.id), otp: activation.otp }, { isActive: true });
    return (result?.affected ?? 0) > 0; 
  }

  public async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: [
        "id",
        "name",
        "lastName",
        "gender",
        "email",
        "phone",
        "birthdate",
        "isActive"
      ],
    });
  }
}
