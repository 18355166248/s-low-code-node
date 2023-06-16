import { Expose } from 'class-transformer';
import { RemoteComp } from 'src/remote-comp/entities/remote-comp.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class RemoteCompVersion {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column()
  @Expose()
  name: string; // 远程组件英文名

  @Column()
  @Expose()
  version: string; // 版本号

  @Column({ unique: true })
  @Expose()
  path: string; // 远程组件路径

  @ManyToOne(() => RemoteComp, (remoteComp) => remoteComp.versions)
  @JoinColumn()
  comp: RemoteComp;
}
