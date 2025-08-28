import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { AuthService } from '../auth/auth.service';
import { User } from '../../entities/User.entity';
import { LoginDTO } from '../../dtos/login.dto';

@Controller('auth/user')
export class UserController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() userData: User) {
    try {
      const user = await this.authService.register(userData);
      return { message: 'User registered successfully', user };
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post('login')
  login(@Body() req: LoginDTO) {
    return this.authService.login(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req): any {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('hello')
  greet() {
    return 'Hello user'
  }
}
