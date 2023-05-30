import { IsNotEmpty } from 'class-validator';

// 分页请求参数
export class PaginationReq {
  @IsNotEmpty({ message: 'pageNo不能为空' })
  pageNo: number;

  @IsNotEmpty({ message: 'pageSize不能为空' })
  pageSize: number;
}
