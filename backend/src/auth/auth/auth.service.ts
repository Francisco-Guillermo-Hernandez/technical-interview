import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../entities/User.entity';
import { LoginDTO } from '../../dtos/login.dto';
import { JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(l: LoginDTO): Promise<Partial<User> | null> {
    const user = await this.usersService.validateUser(l.email, l.password);
    if (user) {
      return user;
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  public async login(l: LoginDTO) {

    const user = await this.validateUser(l);

    if  (user) {
      const payload = { email: user.email, sub: user.id };
      const authConfig = this.configService.get('authConfig') as JwtModuleOptions;
    return {
      access_token: this.jwtService.sign(payload, { privateKey: authConfig.privateKey, algorithm: 'RS256' }),
      user: {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
      },
    };
    }
  }

  async register(userData: User) {
    const existingUser = await this.usersService.findOneByEmail(userData.email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const newUser = await this.usersService.create(userData);

    //@ts-ignore
    const { hashedPassword, ...result } = newUser;
    return result as Omit<User, 'hashedPassword'>;
  }
}
