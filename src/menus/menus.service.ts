import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
  ) {}
  async create(createMenuDto: CreateMenuDto) {
    const res = await this.menuRepository.create(createMenuDto);
    return this.menuRepository.save(res);
  }

  findAll() {
    return this.menuRepository.find();
  }

  findOne(id: number) {
    return this.menuRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const menu = await this.findOne(id);
    const newMenu = await this.menuRepository.merge(menu, updateMenuDto);
    return this.menuRepository.save(newMenu);
  }

  remove(id: number) {
    return this.menuRepository.delete(id);
  }
}
