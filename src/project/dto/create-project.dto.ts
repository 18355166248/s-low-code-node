import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 10)
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}
