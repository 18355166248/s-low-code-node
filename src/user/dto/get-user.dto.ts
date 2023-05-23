import { PaginationReq } from '../../common/commonClass';

export class GetUserDto extends PaginationReq {
  userName?: string;
}
