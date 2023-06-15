import { PartialType } from '@nestjs/mapped-types';
import { CreateRemoteCompVersionDto } from './create-remote-comp-version.dto';

export class UpdateRemoteCompVersionDto extends PartialType(CreateRemoteCompVersionDto) {}
