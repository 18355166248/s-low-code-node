import {
  ExecutionContext,
  Injectable,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from '../enum/config.enum';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    protected configService: ConfigService,
    @InjectRedis() private readonly redis: Redis,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

    if (!token) {
      throw new HttpException('', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    let payload;

    try {
      payload = await verify(token, this.configService.get(ConfigEnum.SECRET));
    } catch (error) {
      throw new HttpException('', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const username = payload['username'];
    const tokenCache = username ? await this.redis.get(username) : null;
    if (!payload || !username || token !== tokenCache) {
      throw new HttpException('', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const parentCanActivate = (await super.canActivate(context)) as boolean;
    return parentCanActivate;
  }
}
