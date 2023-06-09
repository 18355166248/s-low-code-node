import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Role } from '../../roles/entities/role.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 10)
  userName: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 10)
  password: string;

  @IsOptional()
  @IsArray()
  roles?: Role[];
}
