import { Module } from '@nestjs/common';
import { RemoteCompVersionService } from './remote-comp-version.service';
import { RemoteCompVersionController } from './remote-comp-version.controller';

@Module({
  controllers: [RemoteCompVersionController],
  providers: [RemoteCompVersionService]
})
export class RemoteCompVersionModule {}
