import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignUpDto } from './dto/signUp.dto';
import { JwtService } from '@nestjs/jwt';
// import * as argon2 from 'argon2';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwt: JwtService) {}

  // 登录
  async signIn(data: SignUpDto) {
    const user = await this.userService.find(data.userName);

    if (!user) {
      throw new ForbiddenException('用户不存在, 请先注册');
    }
    // 针对密码做比对
    // const isPasswordValidate = await argon2.verify(
    //   user.password,
    //   data.password,
    // );
    const isPasswordValidate = await bcrypt.compare(
      data.password,
      user.password,
    );

    if (!isPasswordValidate) {
      throw new ForbiddenException('用户名或密码错误');
    }

    delete user.password;
    // 这里的数据格式化会在 JwtStrategy 的 validate拿到
    return {
      tokenPromise: this.jwt.signAsync({
        username: data.userName,
        sub: user.id,
      }),
      user,
    };
  }

  // 注册
  async signUp(data: SignUpDto) {
    const user = await this.userService.find(data.userName);

    if (user) {
      throw new ForbiddenException('用户已存在');
    }

    const res = await this.userService.create(data);
    return res;
  }
}
