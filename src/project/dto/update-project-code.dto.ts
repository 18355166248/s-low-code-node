import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { IsString } from 'class-validator';

export class UpdateProjectCodeDto extends PartialType(CreateProjectDto) {
  @IsString()
  code: string; // 代码块
}
