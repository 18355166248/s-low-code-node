import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateRemoteCompDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  version: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  zhName: string;
}
