import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateRemoteCompVersionDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  name: string;

  @IsString()
  @IsNotEmpty()
  path: string; // 远程组件路径

  @IsString()
  @IsNotEmpty()
  version: string; // 远程组件版本
}
