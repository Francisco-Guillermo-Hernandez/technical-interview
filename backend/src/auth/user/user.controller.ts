import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  HttpCode,
  BadRequestException,
} from "@nestjs/common";
import { JwtAuthGuard } from "../guards/jwt.guard";
import { AuthService } from "../auth/auth.service";
import { LoginDTO } from "../../dtos/login.dto";
import { UserDTO } from "../../dtos/user.dto";
import { UserService } from "./user.service";
import type { ActivateRequest } from "../../types/generic";

@Controller("auth/user")
export class UserController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post("register")
  @HttpCode(200)
  async register(@Body() userData: UserDTO) {
    await this.authService.register(userData);
    return { message: "User registered successfully" };
  }

  @Post("login")
  public login(@Body() req: LoginDTO) {
    return this.authService.login(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  public getProfile(@Request() req): any {
    // const userRole = req.user.role;
    return {
      user: req.user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get("hello")
  public greet() {
    return "Hello user";
  }

  @UseGuards(JwtAuthGuard)
  @Post("activate")
  @HttpCode(200)
  public async activateAccount(@Request() req: ActivateRequest) {
    const result = await this.userService.activateAccount({
      email: req.user.email,
      otp: req.body.otp,
      id: req.user.sub,
    });

    if (result) {
      return { message: "El usuario ha sido activado correctamente" };
    }

    throw new BadRequestException("El codigo ya ha sido usado");
  }
}
