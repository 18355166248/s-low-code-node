import { Exclude } from 'class-transformer';
import { Logs } from 'src/logs/entities/log.entity';
import { Role } from 'src/roles/entities/role.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userName: string;

  @Column()
  @Exclude() // 跳过校验
  password: string;

  @OneToMany(() => Logs, (logs) => logs.user, { cascade: true })
  logs: Logs[];

  @ManyToMany(() => Role, (role) => role.users, { cascade: ['insert'] })
  roles: Role[];
}
