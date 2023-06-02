import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { mkdir } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import { join } from 'path';
import { getYearAndMonthAndDay } from 'src/utils/Date';
import { getFileListFromFile } from 'src/utils/fs';
import { PaginationReq } from 'src/common/commonClass';

@Injectable()
export class UploadService {
  async uploadFile(file: Express.Multer.File) {
    if (!file.originalname) {
      throw new HttpException('文件有误', HttpStatus.NOT_ACCEPTABLE);
    }
    const fileName = join(
      __dirname,
      `../../../uploadFile/${getYearAndMonthAndDay()}`,
    );
    try {
      await mkdir(fileName, { recursive: true });
    } catch (error) {
      if (error) {
        throw new HttpException('文件夹有误', HttpStatus.NOT_ACCEPTABLE);
      }
    }

    const writeStream = createWriteStream(
      join(fileName, `${Date.now()}-${file.originalname}`),
    );
    writeStream.write(file.buffer);

    return 'success';
  }

  async uploadFiles(files: Array<Express.Multer.File>) {
    const fileName = join(
      __dirname,
      `../../../uploadFile/${getYearAndMonthAndDay()}`,
    );
    try {
      await mkdir(fileName, { recursive: true });
    } catch (error) {
      if (error) {
        throw new HttpException('文件夹有误', HttpStatus.NOT_ACCEPTABLE);
      }
    }

    for (const file of files) {
      const writeStream = createWriteStream(
        join(fileName, `${Date.now()}-${file.originalname}`),
      );
      writeStream.write(file.buffer);
    }

    return 'success';
  }

  async findAll(query: PaginationReq) {
    const res = await getFileListFromFile(
      join(__dirname, '../../../uploadFile'),
      undefined,
      { ...query, isFirst: true },
    );
    return res;
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

  update(id: number, updateUploadDto: UpdateUploadDto) {
    return `This action updates a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}
