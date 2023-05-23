import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PoliciesGuard } from '../guards/policies-guard.guard';
import { Can, CheckPolicies } from '../decorators/casl.decorators';
import { Action } from '../enum/action.enum';
import { Menu } from './entities/menu.entity';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('menus')
@UseGuards(JwtAuthGuard, AuthGuard('jwt'), PoliciesGuard)
@CheckPolicies((ability) => ability.can(Action.Create, Menu))
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post()
  @Can(Action.Create, Menu)
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menusService.create(createMenuDto);
  }

  @Get()
  @Can(Action.Read, Menu)
  findAll() {
    return this.menusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menusService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.menusService.remove(id);
  }
}
