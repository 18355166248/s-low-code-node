import { Exclude, Expose } from 'class-transformer';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column({ unique: true })
  @Expose()
  name: string;

  @Column({ default: '' })
  @Expose()
  description: string;

  @Column({ type: 'longtext' })
  @Expose()
  code: string; // 代码块

  @ManyToOne(() => User, (user) => user.projects)
  @JoinColumn()
  user: User;
}
