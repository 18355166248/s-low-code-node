import { IsOptional, IsString } from 'class-validator';
import { PaginationReq } from '../../common/commonClass';

export class GetProjectDto extends PaginationReq {
  @IsOptional() // 选填字段校验
  @IsString()
  name: string;
}
