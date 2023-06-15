import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RemoteCompVersionService } from './remote-comp-version.service';
import { CreateRemoteCompVersionDto } from './dto/create-remote-comp-version.dto';
import { UpdateRemoteCompVersionDto } from './dto/update-remote-comp-version.dto';

@Controller('remote-comp-version')
export class RemoteCompVersionController {
  constructor(private readonly remoteCompVersionService: RemoteCompVersionService) {}

  @Post()
  create(@Body() createRemoteCompVersionDto: CreateRemoteCompVersionDto) {
    return this.remoteCompVersionService.create(createRemoteCompVersionDto);
  }

  @Get()
  findAll() {
    return this.remoteCompVersionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.remoteCompVersionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRemoteCompVersionDto: UpdateRemoteCompVersionDto) {
    return this.remoteCompVersionService.update(+id, updateRemoteCompVersionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.remoteCompVersionService.remove(+id);
  }
}
