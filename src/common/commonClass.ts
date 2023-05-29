import { IsNotEmpty } from 'class-validator';

// 分页请求参数
export class PaginationReq {
  userName: string;

  @IsNotEmpty()
  pageNo: number;

  @IsNotEmpty()
  pageSize: number;
}
