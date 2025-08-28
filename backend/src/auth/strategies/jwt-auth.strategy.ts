import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const config: JwtModuleOptions = configService.get('authConfig') as JwtModuleOptions;
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.privateKey,
      algorithms: config.verifyOptions?.algorithms,
    });
  }

  public validate(payload: any) {
    return { id: payload.sub, email: payload.email };
  }
}
