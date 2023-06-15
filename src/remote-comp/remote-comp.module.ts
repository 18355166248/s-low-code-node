import { Module } from '@nestjs/common';
import { RemoteCompService } from './remote-comp.service';
import { RemoteCompController } from './remote-comp.controller';

@Module({
  controllers: [RemoteCompController],
  providers: [RemoteCompService],
})
export class RemoteCompModule {}
