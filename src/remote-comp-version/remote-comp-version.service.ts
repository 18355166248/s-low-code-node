import { Injectable } from '@nestjs/common';
import { CreateRemoteCompVersionDto } from './dto/create-remote-comp-version.dto';
import { UpdateRemoteCompVersionDto } from './dto/update-remote-comp-version.dto';

@Injectable()
export class RemoteCompVersionService {
  create(createRemoteCompVersionDto: CreateRemoteCompVersionDto) {
    return 'This action adds a new remoteCompVersion';
  }

  findAll() {
    return `This action returns all remoteCompVersion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} remoteCompVersion`;
  }

  update(id: number, updateRemoteCompVersionDto: UpdateRemoteCompVersionDto) {
    return `This action updates a #${id} remoteCompVersion`;
  }

  remove(id: number) {
    return `This action removes a #${id} remoteCompVersion`;
  }
}
