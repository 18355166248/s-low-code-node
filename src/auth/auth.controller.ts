import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

export interface SignInterface {
  userName: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 登录
  @Post('signIn')
  signIn(@Body() body: SignInterface) {
    return this.authService.signIn(body);
  }

  // 注册
  @Post('signUp')
  signUp(@Body() body: SignInterface) {
    return this.authService.signUp(body);
  }
}
