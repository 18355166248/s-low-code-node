import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { RemoteCompService } from './remote-comp.service';
import { CreateRemoteCompDto } from './dto/create-remote-comp.dto';
import { UpdateRemoteCompDto } from './dto/update-remote-comp.dto';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';

@Controller('remote-comp')
export class RemoteCompController {
  constructor(private readonly remoteCompService: RemoteCompService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, { mimetype }, callback) => {
        if (mimetype.indexOf('/zip') > -1) {
          callback(null, true);
        } else {
          callback(new Error('只支持上传zip压缩包'), false);
        }
      },
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createRemoteCompDto: CreateRemoteCompDto,
  ) {
    return this.remoteCompService.create(file, createRemoteCompDto);
  }

  @Get()
  findAll() {
    return this.remoteCompService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.remoteCompService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRemoteCompDto: UpdateRemoteCompDto,
  ) {
    return this.remoteCompService.update(+id, updateRemoteCompDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.remoteCompService.remove(+id);
  }
}
