import { IsNotEmpty } from 'class-validator';

// 分页请求参数
export class PaginationReq {
  @IsNotEmpty()
  pageNo: number;

  @IsNotEmpty()
  pageSize: number;
}
