import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from '../enum/config.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(protected configService: ConfigService) {
    super({
      // 解析请求过来的 token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(ConfigEnum.SECRET),
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
