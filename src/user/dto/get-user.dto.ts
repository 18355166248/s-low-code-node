import { IsOptional, IsString } from 'class-validator';
import { PaginationReq } from '../../common/commonClass';

export class GetUserDto extends PaginationReq {
  @IsOptional() // 选填字段校验
  @IsString()
  userName: string;
}
