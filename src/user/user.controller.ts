import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { AuthGuard } from '@nestjs/passport';
import { PoliciesGuard } from '../guards/policies-guard.guard';
import { Action } from '../enum/action.enum';
import { User } from './entities/user.entity';
import { Can } from '../decorators/casl.decorators';

@Controller('user')
@UseGuards(JwtAuthGuard, AuthGuard('jwt'), PoliciesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Can(Action.Create, User)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Can(Action.Read, User)
  findAll(@Query() query: GetUserDto) {
    console.log('query', query);
    return this.userService.findAll(query);
  }

  @Get(':id')
  @Can(Action.Read, User)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @Can(Action.Update, User)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Can(Action.Delete, User)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
