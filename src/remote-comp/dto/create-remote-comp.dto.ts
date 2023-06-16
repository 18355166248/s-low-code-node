import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { PaginationReq } from 'src/common/commonClass';

export class CreateRemoteCompDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  version: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  zhName: string;
}

export class GetRemoteComp extends PaginationReq {
  @IsOptional() // 选填字段校验
  @IsString()
  name: string;
}
