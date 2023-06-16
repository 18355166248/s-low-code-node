import { Module } from '@nestjs/common';
import { RemoteCompService } from './remote-comp.service';
import { RemoteCompController } from './remote-comp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RemoteComp } from './entities/remote-comp.entity';
import { RemoteCompVersion } from 'src/remote-comp-version/entities/remote-comp-version.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RemoteComp, RemoteCompVersion])],
  controllers: [RemoteCompController],
  providers: [RemoteCompService],
})
export class RemoteCompModule {}
