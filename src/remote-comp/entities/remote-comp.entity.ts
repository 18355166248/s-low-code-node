import { Expose } from 'class-transformer';
import { RemoteCompVersion } from '../../remote-comp-version/entities/remote-comp-version.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class RemoteComp {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column({ unique: true })
  @Expose()
  name: string; // 远程组件英文名

  @Column({ unique: true })
  @Expose()
  zhName: string; // 远程组件中文名

  @Column()
  @Expose()
  currentVersion: string; // 当前正在应用的版本号

  @Column({ unique: true })
  @Expose()
  path: string; // 远程组件路径

  @OneToMany(() => RemoteCompVersion, (version) => version.comp)
  versions: RemoteCompVersion[]; // 远程组件版本
}
