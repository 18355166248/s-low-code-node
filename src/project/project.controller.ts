import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  Request,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { GetProjectDto } from './dto/get-project.dto';
import { UpdateProjectCodeDto } from './dto/update-project-code.dto';

@Controller('project')
@UseGuards(JwtAuthGuard, AuthGuard('jwt'))
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto, @Req() req) {
    return this.projectService.create(createProjectDto, req);
  }

  @Get()
  findAll(@Query() query: GetProjectDto, @Request() req) {
    return this.projectService.findAll(query, req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Patch('/code/:id')
  updateCode(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectCodeDto,
  ) {
    console.log('updateProjectDto', updateProjectDto);
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
