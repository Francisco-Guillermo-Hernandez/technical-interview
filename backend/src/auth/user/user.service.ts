import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/User.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async create(userData: Partial<User>): Promise<User> {
    const user = new User();
    Object.assign(user, userData);
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

  public async validateUser(email: string, password: string): Promise<Partial<User> | null> {
    const user = await this.findOneByEmail(email);
    if (user && (await user.validatePassword(password))) {
    
      // @ts-ignore
      const { hashedPassword, ...result } = user;
      return result;
    }

    return null;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: [
        'id',
        'name',
        'lastName',
        'gender',
        'email',
        'phone',
        'birthdate',
      ],
    });
  }
}
