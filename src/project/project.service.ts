import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetProjectDto } from './dto/get-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto, req: any) {
    const newProject = await this.projectRepository.create({
      ...createProjectDto,
      code: '',
    });
    newProject.user = req.user.userId;

    const res = await this.projectRepository.save(newProject);

    return res;
  }

  async findAll(params: GetProjectDto, req: any) {
    const { userId } = req.user;
    const { pageNo, pageSize } = params;
    const take = pageSize || 10;
    const skip = ((pageNo || 1) - 1) * take;
    const qb = this.projectRepository
      .createQueryBuilder('project')
      .relation('user')
      .select(['project.id', 'project.name', 'project.description'])
      .where('project.user = :user', { user: userId })
      .orderBy('project.id', 'DESC')
      .skip(skip)
      .take(take);

    const res = await qb.getManyAndCount();

    return {
      data: res[0],
      total: res[1],
      pageNo,
      pageSize,
    };
  }

  findOne(id: number) {
    return this.projectRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const projectTemp = await this.findOne(id);
    const newProject = this.projectRepository.merge(
      projectTemp,
      updateProjectDto,
    );
    // 联合模型更新，需要使用save方法或者queryBuilder
    return this.projectRepository.save(newProject);
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
