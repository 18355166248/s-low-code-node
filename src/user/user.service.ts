import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { GetUserDto } from './dto/get-user.dto';
import { conditionUtils } from 'src/utils/db.helper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(query: GetUserDto) {
    const { pageNo, pageSize, userName } = query;
    const take = pageSize || 10;
    const skip = ((pageNo || 1) - 1) * pageSize;

    const obj = {
      'user.userName': userName,
    };

    let qb = this.userRepository
      .createQueryBuilder('user')
      .skip(skip)
      .take(take);
    // 动态添加搜索 如果没有值则不搜索
    qb = conditionUtils(qb, obj);
    const res = await qb.getManyAndCount();
    return {
      data: res[0],
      total: res[1],
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
