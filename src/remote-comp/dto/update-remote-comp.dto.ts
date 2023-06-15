import { PartialType } from '@nestjs/mapped-types';
import { CreateRemoteCompDto } from './create-remote-comp.dto';

export class UpdateRemoteCompDto extends PartialType(CreateRemoteCompDto) {}
