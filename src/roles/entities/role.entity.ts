import { Expose } from 'class-transformer';
import { Menu } from 'src/menus/entities/menu.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column()
  @Expose()
  name: string;

  @ManyToMany(() => User, (user) => user.roles)
  @Expose()
  users: User[];

  @ManyToMany(() => Menu, (menu) => menu.role)
  @Expose()
  menus: Menu[];
}
