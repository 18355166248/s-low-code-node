import { Injectable } from '@nestjs/common';
import { SignInterface } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { GetUserDto } from 'src/user/dto/get-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signIn(data: SignInterface) {
    const user = await this.userService.findAll({
      userName: data.userName,
    } as GetUserDto);
    console.log('data', data);
    console.log('user', user);
    return user;
  }

  async signUp(data: SignInterface) {
    const user = await this.userService.create(data);
    return 'signUp';
  }
}
