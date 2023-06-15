import { Test, TestingModule } from '@nestjs/testing';
import { RemoteCompVersionController } from './remote-comp-version.controller';
import { RemoteCompVersionService } from './remote-comp-version.service';

describe('RemoteCompVersionController', () => {
  let controller: RemoteCompVersionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RemoteCompVersionController],
      providers: [RemoteCompVersionService],
    }).compile();

    controller = module.get<RemoteCompVersionController>(RemoteCompVersionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
