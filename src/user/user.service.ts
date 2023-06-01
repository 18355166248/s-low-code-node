import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { In, Repository } from 'typeorm';
import { GetUserDto } from './dto/get-user.dto';
import { fuzzySearchUtils } from '../utils/db.helper';
import { Role } from '../roles/entities/role.entity';
// import * as argon2 from 'argon2';
import { RolesService } from 'src/roles/roles.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    private readonly roleService: RolesService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (!createUserDto.roles) {
      const role = await this.roleRepository.findOne({ where: { id: 3 } });
      if (!role) {
        throw new ForbiddenException('没有可用的角色');
      }
      createUserDto.roles = [role];
    }
    if (Array.isArray(createUserDto.roles)) {
      // 查询出所有的角色
      createUserDto.roles = await this.roleRepository.find({
        where: {
          id: In(createUserDto.roles),
        },
      });
    }

    const user = await this.userRepository.create(createUserDto);
    // 创建用户针对密码做加密
    // user.password = await argon2.hash(user.password);
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    user.password = await bcrypt.hash(user.password, salt);

    const res = await this.userRepository.save(user);

    return res;
  }

  async find(userName: string) {
    return this.userRepository.findOne({
      where: { userName },
      relations: ['roles', 'roles.menus'],
    });
  }

  async findAll(query: GetUserDto) {
    const { pageNo, pageSize, userName } = query;
    const take = pageSize || 10;
    const skip = ((pageNo || 1) - 1) * take;
    const obj = {
      'user.userName': userName,
    };
    let qb = this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.userName', 'roles.name', 'roles.id']) // 指定返回的字段
      .leftJoin('user.roles', 'roles')
      .orderBy('user.id', 'DESC')
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

  findOne(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        roles: true,
      },
    });
  }
  async getRoles(roleIds: number[]): Promise<Role[]> {
    const arr = [];
    roleIds.map(async (id) => {
      arr.push(this.roleService.findOne(id));
    });
    return Promise.all(arr);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userTemp = await this.findOne(id);
    const roleIds: any = updateUserDto.roles;
    const roles: any = await this.getRoles(roleIds);
    updateUserDto.roles = roles;
    delete userTemp.roles;
    const newUser = this.userRepository.merge(userTemp, updateUserDto);
    // 联合模型更新，需要使用save方法或者queryBuilder
    return this.userRepository.save(newUser);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
