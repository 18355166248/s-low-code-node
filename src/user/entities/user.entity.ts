import { Exclude } from 'class-transformer';
import { Logs } from '../../logs/entities/log.entity';
import { Role } from '../../roles/entities/role.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from '../../project/entities/project.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column({ unique: true })
  userName: string;

  @Column()
  @Exclude() // 排除
  password: string;

  @OneToMany(() => Logs, (logs) => logs.user, { cascade: true })
  logs: Logs[];

  @ManyToMany(() => Role, (role) => role.users, { cascade: ['insert'] })
  @JoinTable({ name: 'users_roles' })
  roles: Role[];

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];
}
