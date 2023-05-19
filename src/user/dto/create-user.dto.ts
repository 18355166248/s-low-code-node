import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Role } from 'src/roles/entities/role.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  userName: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  roles?: Role[];
}
