import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/signUp.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwt: JwtService) {}

  async signIn(data: SignUpDto) {
    const user = await this.userService.find(data.userName);

    if (!user) {
      throw new ForbiddenException('用户不存在, 请先注册');
    }

    // 这里的数据格式化会在 JwtStrategy 的 validate拿到
    return this.jwt.signAsync({
      username: data.userName,
      sub: user.id,
    });
  }

  async signUp(data: SignUpDto) {
    const user = await this.userService.create(data);
    return 'signUp';
  }
}
