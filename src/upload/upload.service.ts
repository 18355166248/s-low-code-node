import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { mkdir, readFile } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import { join } from 'path';
import { getNowFormatDate } from 'src/utils/Date';
import { getFileListFromFile } from 'src/utils/fs';
import { PaginationReq } from 'src/common/commonClass';
import { getServerConfig } from 'ormconfig';
import { transformWebp } from 'src/utils/webp';

const config = getServerConfig();

@Injectable()
export class UploadService {
  async uploadFile(file: Express.Multer.File) {
    if (!file.originalname) {
      throw new HttpException('文件有误', HttpStatus.NOT_ACCEPTABLE);
    }
    const { mimetype } = file;
    const notWebp = mimetype !== 'image/webp'; // 不是webp 再保存一份 webp
    const path = getNowFormatDate();
    const fileName = join(__dirname, `../../../uploadFile/${path}`);
    try {
      await mkdir(fileName, { recursive: true });
    } catch (error) {
      if (error) {
        throw new HttpException('文件夹创建失败', HttpStatus.NOT_ACCEPTABLE);
      }
    }

    const file_name = `${Date.now()}-${file.originalname}`;
    const file_path_name = join(fileName, file_name);

    // 另外保存一份 webp
    if (notWebp) {
      const fileNameList = file_name.split('.');
      fileNameList[fileNameList.length - 1] = '.webp';
      const webpFileName = fileNameList.join('');
      const webp_file_path_name = join(fileName, webpFileName);
      transformWebp({
        filePath: file_path_name,
        outputFile: webp_file_path_name,
      });
    }

    const writeStream = createWriteStream(file_path_name);
    writeStream.write(file.buffer);

    return `${config['PREVIEW_IMAGES'] || ''}/${path}/${file_name}`;
  }

  async uploadFiles(files: Array<Express.Multer.File>) {
    const path = getNowFormatDate();
    const fileName = join(__dirname, `../../../uploadFile/${path}`);
    try {
      await mkdir(fileName, { recursive: true });
    } catch (error) {
      if (error) {
        throw new HttpException('文件夹有误', HttpStatus.NOT_ACCEPTABLE);
      }
    }

    const res = [];
    for (const file of files) {
      const { mimetype } = file;
      const notWebp = mimetype !== 'image/webp'; // 不是webp 再保存一份 webp
      const file_name = `${Date.now()}-${file.originalname}`;
      const file_path_name = join(fileName, file_name);

      // 另外保存一份 webp
      if (notWebp) {
        const fileNameList = file_name.split('.');
        fileNameList[fileNameList.length - 1] = '.webp';
        const webpFileName = fileNameList.join('');
        const webp_file_path_name = join(fileName, webpFileName);
        transformWebp({
          filePath: file_path_name,
          outputFile: webp_file_path_name,
        });
      }

      const writeStream = createWriteStream(file_path_name);
      writeStream.write(file.buffer);
      res.push(`${config['PREVIEW_IMAGES'] || ''}/${path}/${file_name}`);
    }

    return res;
  }

  async findAll(query: PaginationReq) {
    const fileName = join(__dirname, '../../../uploadFile');
    const res = await getFileListFromFile(fileName, undefined, {
      ...query,
      isFirst: true,
    });
    return res;
  }

  async findOne(fileName: string) {
    const path = join(__dirname, '../../../uploadFile', fileName);
    const res = await readFile(path);

    return res;
  }

  update(id: number, updateUploadDto: UpdateUploadDto) {
    return `This action updates a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}
