import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 登录
  @Post('signIn')
  signIn(@Body() body: SignUpDto) {
    return this.authService.signIn(body);
  }

  // 注册
  @Post('signUp')
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }
}
