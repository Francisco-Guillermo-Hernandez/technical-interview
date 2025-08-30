import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
} from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../../entities/User.entity";
import { LoginDTO } from "../../dtos/login.dto";
import { JwtModuleOptions } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserDTO } from "../../dtos/user.dto";
import { EmailService } from "../../emailer/email/email.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private emailService: EmailService
  ) {}

  async validateUser(l: LoginDTO): Promise<Partial<User> | null> {
    const user = await this.usersService.validateUser(l.email, l.password);
    if (user) {
      return user;
    } else {
      throw new UnauthorizedException("Invalid credentials");
    }
  }

  public async login(l: LoginDTO) {
    const user = await this.validateUser(l);

    if (user) {
      const payload = { email: user.email, sub: user._id, role: user.role, isActive: user.isActive };
      const authConfig = this.configService.get(
        "authConfig",
      ) as JwtModuleOptions;
      return {
        access_token: this.jwtService.sign(payload, {
          privateKey: authConfig.privateKey,
          algorithm: "RS256",
          expiresIn: "1h"
        }),
        user: {
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          isActive: user.isActive,
        },
      };
    }
    
    // if (user && !user.isActive) {
    //   throw new ForbiddenException('Your account is locked');
    // }
  }

  public async register(userData: UserDTO) {
    const existingUser = await this.usersService.findOneByEmail(userData.email);
    const otp = this.generateOTP();
    if (existingUser) {
      throw new BadRequestException("This user cannot be created");
    }
    const newUser = await this.usersService.create({...userData, isActive: false, otp });
    await this.emailService.sendVerificationEmail(userData.email, otp, 'Usa este OTP para activar tu cuenta')

    //@ts-ignore
    const { hashedPassword, ...result } = newUser;
    return result as Omit<User, "hashedPassword">;
  }

  public generateOTP(): string {
    const otp = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('');
    return `${otp.slice(0, 3)}-${otp.slice(3)}`;
  }
}
