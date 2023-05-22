import { Body, Controller, Post } from '@nestjs/common';
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
    const token = await this.authService.signIn(body);
    // 缓存token
    await this.redis.set(body.userName, token);
    return {
      access_token: token,
    };
  }

  // 注册
  @Post('signUp')
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }
}
