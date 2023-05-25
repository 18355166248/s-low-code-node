import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  @Length(2, 10, {
    message: `用户名长度必须在$constraint1到$constraint2之间, 当前传递的值是$value`,
  })
  userName: string;

  @IsString()
  @IsNotEmpty({
    message: '用户密码不能为空',
  })
  @Length(6, 10, {
    message: `用户密码必须在$constraint1到$constraint2之间, 当前传递的值是$value`,
  })
  password: string;
}
