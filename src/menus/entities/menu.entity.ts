import { Role } from 'src/roles/entities/role.entity';
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

  @Column()
  name: string;

  @Column()
  path: string;

  @Column()
  order: number;

  // 一个用户对应多个menu
  @ManyToMany(() => Role, (role) => role.menus)
  @JoinTable({ name: 'role_menus' })
  role: Role[];
}
