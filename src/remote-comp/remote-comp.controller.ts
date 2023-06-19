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
  Query,
} from '@nestjs/common';
import { RemoteCompService } from './remote-comp.service';
import {
  CreateRemoteCompDto,
  GetRemoteComp,
} from './dto/create-remote-comp.dto';
import { UpdateRemoteCompDto } from './dto/update-remote-comp.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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
  uploadWithCreate(
    @UploadedFile() file: Express.Multer.File,
    @Body() createRemoteCompDto: CreateRemoteCompDto,
  ) {
    return this.remoteCompService.uploadWithCreate(file, createRemoteCompDto);
  }

  @Get()
  findPage(@Query() query: GetRemoteComp) {
    return this.remoteCompService.findPage(query);
  }

  @Get('all')
  findAll() {
    return this.remoteCompService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.remoteCompService.findOne(+id);
  }

  @Patch(':id')
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
  update(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Body() updateRemoteCompDto: UpdateRemoteCompDto,
  ) {
    return this.remoteCompService.update(+id, updateRemoteCompDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.remoteCompService.remove(+id);
  }
}
