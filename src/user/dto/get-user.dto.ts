import { PaginationReq } from 'src/common/commonClass';

export class GetUserDto extends PaginationReq {
  userName?: string;
}
