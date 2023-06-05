import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { PaginationReq } from 'src/common/commonClass';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('upload')
@UseGuards(JwtAuthGuard, AuthGuard('jwt'))
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('file')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, { mimetype }, callback) => {
        if (mimetype.indexOf('image/') > -1) {
          callback(null, true);
        } else {
          callback(new Error('只支持上传图片'), false);
        }
      },
    }),
  )
  uploadFile(@UploadedFile() file) {
    return this.uploadService.uploadFile(file);
  }

  @Post('files')
  @UseInterceptors(FilesInterceptor('files', 10)) // 最大上传数量
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.uploadService.uploadFiles(files);
  }

  @Get('list')
  findAll(@Query() query: PaginationReq) {
    return this.uploadService.findAll(query);
  }

  @Get('/getOne/:filePath/:fileName')
  findOne(@Param() params: any) {
    const { filePath, fileName } = params;
    return this.uploadService.findOne(filePath + '/' + fileName);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadService.remove(+id);
  }
}
