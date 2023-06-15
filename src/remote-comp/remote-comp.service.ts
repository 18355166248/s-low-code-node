import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRemoteCompDto } from './dto/create-remote-comp.dto';
import { UpdateRemoteCompDto } from './dto/update-remote-comp.dto';
import { join } from 'path';
import { mkdir } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import { extractZip } from '../utils/zip';

@Injectable()
export class RemoteCompService {
  async create(
    file: Express.Multer.File,
    createRemoteCompDto: CreateRemoteCompDto,
  ) {
    console.log('file', file);
    const { originalname } = file;
    console.log('createRemoteCompDto', createRemoteCompDto);
    const { version, name } = createRemoteCompDto;
    const fileName = join(
      __dirname,
      `../../../uploadRemoteComp/${name}/${version}`,
    );
    try {
      await mkdir(fileName, { recursive: true });
    } catch (error) {
      if (error) {
        throw new HttpException('文件夹创建失败', HttpStatus.NOT_ACCEPTABLE);
      }
    }
    const file_path_name = join(fileName, originalname);

    // 保存zip文件
    const writeStream = createWriteStream(file_path_name);
    writeStream.write(file.buffer);

    // 解压zip文件
    try {
      await extractZip(file_path_name, fileName);
    } catch (error) {
      console.log('error', error);
      throw new HttpException(
        `解压${originalname}文件失败`,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    return 'This action adds a new remoteComp';
  }

  findAll() {
    return `This action returns all remoteComp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} remoteComp`;
  }

  update(id: number, updateRemoteCompDto: UpdateRemoteCompDto) {
    return `This action updates a #${id} remoteComp`;
  }

  remove(id: number) {
    return `This action removes a #${id} remoteComp`;
  }
}
