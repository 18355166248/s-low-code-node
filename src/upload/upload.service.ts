import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { mkdir } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import { join } from 'path';
import { getYearAndMonth } from 'src/utils/Date';

@Injectable()
export class UploadService {
  async uploadFile(file: Express.Multer.File) {
    if (!file.originalname) {
      throw new HttpException('文件有误', HttpStatus.NOT_ACCEPTABLE);
    }
    const fileName = join(
      __dirname,
      `../../../uploadFile/${getYearAndMonth()}`,
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
      `../../../uploadFile/${getYearAndMonth()}`,
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

  findAll() {
    return `This action returns all upload`;
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
