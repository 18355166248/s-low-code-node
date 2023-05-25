import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  // 登录
  @Post('signIn')
  async signIn(@Body() body: SignUpDto) {
    const { tokenPromise, user } = await this.authService.signIn(body);
    const token = await tokenPromise;
    // 缓存token
    await this.redis.set(body.userName, token);
    return {
      access_token: token,
      user,
    };
  }

  // 注册
  // 排除属性
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signUp')
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  // 登出
  @Post('signOut')
  async signOut(@Body() body: Pick<SignUpDto, 'userName'>) {
    await this.redis.del(body.userName);

    return 'success';
  }
}
