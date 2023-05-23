import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateMenuDto {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  path: string;

  @IsNumber()
  @IsOptional()
  order: number;

  @IsString()
  @IsNotEmpty()
  acl: string;
}
