import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { AuthGuard } from '@nestjs/passport';
import { PoliciesGuard } from '../guards/policies-guard.guard';
import { Can } from '../decorators/casl.decorators';
import { Action } from '../enum/action.enum';
import { Role } from './entities/role.entity';

@Controller('roles')
@UseGuards(JwtAuthGuard, AuthGuard('jwt'))
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @Can(Action.Create, Role)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @Can(Action.Read, Role)
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  @Can(Action.Update, Role)
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @Can(Action.Delete, Role)
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
