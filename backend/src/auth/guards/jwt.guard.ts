import { Injectable,  UnauthorizedException, ExecutionContext,  } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private jwtService: JwtService, private configService: ConfigService) {
        super()
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const authConfig = this.configService.get('authConfig') as JwtModuleOptions;
      const payload = await this.jwtService.verifyAsync(token,
        {
          publicKey: authConfig.publicKey,
          algorithms: ['RS256']
        }
      );
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers?.['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
