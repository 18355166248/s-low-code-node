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
import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { AuthGuard } from '@nestjs/passport';
import { PoliciesGuard } from '../guards/policies-guard.guard';
import { Action } from '../enum/action.enum';
import { Logs } from './entities/log.entity';
import { Can } from '../decorators/casl.decorators';

@Controller('logs')
@UseGuards(JwtAuthGuard, AuthGuard('jwt'), PoliciesGuard)
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post()
  @Can(Action.Create, Logs)
  create(@Body() createLogDto: CreateLogDto) {
    return this.logsService.create(createLogDto);
  }

  @Get()
  @Can(Action.Read, Logs)
  findAll() {
    return this.logsService.findAll();
  }

  @Get(':id')
  @Can(Action.Read, Logs)
  findOne(@Param('id') id: string) {
    return this.logsService.findOne(+id);
  }

  @Patch(':id')
  @Can(Action.Update, Logs)
  update(@Param('id') id: string, @Body() updateLogDto: UpdateLogDto) {
    return this.logsService.update(+id, updateLogDto);
  }

  @Delete(':id')
  @Can(Action.Delete, Logs)
  remove(@Param('id') id: string) {
    return this.logsService.remove(+id);
  }
}
