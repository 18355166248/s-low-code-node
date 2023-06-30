import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateRemoteCompDto,
  GetRemoteComp,
} from './dto/create-remote-comp.dto';
import { UpdateRemoteCompDto } from './dto/update-remote-comp.dto';
import { join } from 'path';
import { mkdir } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import { extractZip } from '../utils/zip';
import { InjectRepository } from '@nestjs/typeorm';
import { RemoteComp } from './entities/remote-comp.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateRemoteCompVersionDto } from '../remote-comp-version/dto/create-remote-comp-version.dto';
import { RemoteCompVersion } from '../remote-comp-version/entities/remote-comp-version.entity';
import { getServerConfig } from 'ormconfig';
import { fuzzySearchUtils } from 'src/utils/db.helper';

const compressingConfig = {
  pathKey: 'offline',
};

@Injectable()
export class RemoteCompService {
  config: Record<string, unknown>;

  constructor(
    private readonly connection: DataSource,
    @InjectRepository(RemoteComp)
    private readonly remoteCompRepository: Repository<RemoteComp>,
    @InjectRepository(RemoteCompVersion)
    private readonly remoteCompVersionRepository: Repository<RemoteCompVersion>,
  ) {
    const config = getServerConfig();
    this.config = config;
  }

  async uploadWithCreate(
    file: Express.Multer.File,
    createRemoteCompDto: CreateRemoteCompDto,
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const { originalname } = file;
        const { version, name } = createRemoteCompDto;
        // 基于项目根路径存储的路径
        const cwdPath = `/uploadRemoteComp/${name}/${version}`;
        // 当前电脑路径
        const fileName = join(__dirname, `../../..${cwdPath}`);

        try {
          await mkdir(fileName, { recursive: true });
        } catch (error) {
          if (error) {
            throw new HttpException(
              '文件夹创建失败',
              HttpStatus.NOT_ACCEPTABLE,
            );
          }
        }
        const file_path_name = join(fileName, originalname);

        // 保存zip文件
        const writeStream = createWriteStream(file_path_name);
        writeStream.write(file.buffer);

        // 标记写入完成
        writeStream.end();

        writeStream.on('finish', async () => {
          console.log(`${file_path_name} 写入完成`);

          // 解压zip文件
          try {
            await extractZip(file_path_name, fileName);
          } catch (error) {
            console.log('error', error);

            reject(
              new HttpException(
                `解压压缩文件 ${originalname} 失败`,
                HttpStatus.NOT_ACCEPTABLE,
              ),
            );
          }

          try {
            // 创建数据
            await this.create({
              ...createRemoteCompDto,
              path: `${cwdPath}/${compressingConfig.pathKey}`,
            });

            resolve('success');
          } catch (error) {
            reject(new HttpException(error, HttpStatus.NOT_ACCEPTABLE));
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async create(
    createRemoteCompDto: CreateRemoteCompDto & CreateRemoteCompVersionDto,
  ) {
    const { version, name, zhName, path } = createRemoteCompDto;

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    const remoteCompData = new RemoteComp();
    remoteCompData.name = name;
    remoteCompData.zhName = zhName;
    remoteCompData.currentVersion = version;
    remoteCompData.path = path;

    const remoteCompVersionData = new RemoteCompVersion();
    remoteCompVersionData.name = name;
    remoteCompVersionData.version = version;
    remoteCompVersionData.path = path;

    await queryRunner.startTransaction();

    try {
      // 新建远程组件
      const newRemoteComp = await queryRunner.manager.save(remoteCompData);
      // 新建远程组件版本管理
      const newRemoteCompVersion = await queryRunner.manager.save(
        remoteCompVersionData,
      );
      newRemoteComp.versions = [newRemoteCompVersion];
      await queryRunner.manager.save(newRemoteComp);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();

      return Promise.reject(error);
    } finally {
      await queryRunner.release();
    }

    return;
  }

  async findPage(query: GetRemoteComp) {
    const { pageNo, pageSize, name } = query;
    const take = pageSize || 10;
    const skip = ((pageNo || 1) - 1) * take;

    const obj = {
      'RemoteComp.name': name,
    };

    let qb = this.remoteCompRepository
      .createQueryBuilder('RemoteComp')
      .leftJoinAndSelect('RemoteComp.versions', 'version')
      .select([
        'RemoteComp.id',
        'RemoteComp.name',
        'RemoteComp.zhName',
        'RemoteComp.currentVersion',
        'version',
      ]) // 指定返回的字段
      .orderBy('RemoteComp.id', 'DESC')
      .skip(skip)
      .take(take);

    // 动态添加搜索 如果没有值则不搜索
    qb = fuzzySearchUtils(qb, obj);
    const res = await qb.getManyAndCount();

    return {
      data: res[0],
      total: res[1],
      pageNo,
      pageSize,
    };
  }

  async findAll() {
    const qb = this.remoteCompRepository
      .createQueryBuilder('RemoteComp')
      .orderBy('RemoteComp.id', 'DESC');

    // 如果没有值则不搜索
    const res = await qb.getMany();

    return {
      data: res,
    };
  }

  // 查询一个组件有多少版本
  async findOne(id: number) {
    const res = await this.remoteCompRepository.findOne({
      where: {
        id,
      },
      relations: ['versions'],
    });
    if (!res) throw new HttpException('组件不存在', HttpStatus.NOT_ACCEPTABLE);
    return res;
  }

  async update(
    id: number,
    updateRemoteCompDto: UpdateRemoteCompDto,
    file: Express.Multer.File,
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const remoteCompRes = await this.findOne(id);
        const { versions } = remoteCompRes;

        const { version } = updateRemoteCompDto;
        console.log('versions', versions, version);
        // 判断版本号是否合法
        if (versions.map((v) => v.version).includes(version)) {
          return reject(
            new HttpException('版本号已经存在', HttpStatus.NOT_ACCEPTABLE),
          );
        }

        // 基于项目根路径存储的路径
        const cwdPath = `/uploadRemoteComp/${remoteCompRes.name}/${version}`;
        // 当前电脑路径
        const fileName = join(__dirname, `../../..${cwdPath}`);
        const { originalname } = file;

        // 创建文件夹
        try {
          await mkdir(fileName, { recursive: true });
        } catch (error) {
          if (error) {
            throw new HttpException(
              '文件夹创建失败',
              HttpStatus.NOT_ACCEPTABLE,
            );
          }
        }
        const file_path_name = join(fileName, originalname);

        // 保存zip文件
        const writeStream = createWriteStream(file_path_name);
        writeStream.write(file.buffer);

        // 标记写入完成
        writeStream.end();

        writeStream.on('finish', async () => {
          console.log(`写入完成 ${file_path_name}`);

          // 解压zip文件
          try {
            await extractZip(file_path_name, fileName);
          } catch (error) {
            console.log('error', error);

            reject(
              new HttpException(
                `解压压缩文件 ${originalname} 失败`,
                HttpStatus.NOT_ACCEPTABLE,
              ),
            );
          }

          console.log(`解压完成 ${file_path_name}`);

          const queryRunner = this.connection.createQueryRunner();
          await queryRunner.connect();

          const remoteCompVersionData = new RemoteCompVersion();
          remoteCompVersionData.name = remoteCompRes.name;
          remoteCompVersionData.version = version;
          remoteCompVersionData.path = `${cwdPath}/${compressingConfig.pathKey}`;

          await queryRunner.startTransaction();

          try {
            // 新建远程组件版本管理
            const newRemoteCompVersion = await queryRunner.manager.save(
              remoteCompVersionData,
            );
            // 更新组件版本号
            remoteCompRes.versions.push(newRemoteCompVersion);
            await queryRunner.manager.save(remoteCompRes);
            await queryRunner.commitTransaction();
          } catch (error) {
            await queryRunner.rollbackTransaction();

            return reject(error);
          } finally {
            await queryRunner.release();
          }

          return resolve('success');
        });
      } catch (error) {
        return reject(error);
      }
    });
  }

  remove(id: number) {
    return `This action removes a #${id} remoteComp`;
  }
}
