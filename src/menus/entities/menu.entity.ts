import { Role } from '../../roles/entities/role.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  path: string;

  @Column()
  order: number;

  @Column()
  acl: string; // 权限控制 CREATE, READ, UPDATE, DELETE, MANAGE

  // 一个用户对应多个menu
  @ManyToMany(() => Role, (role) => role.menus)
  @JoinTable({ name: 'role_menus' })
  role: Role[];
}
