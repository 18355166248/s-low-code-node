import { Test, TestingModule } from '@nestjs/testing';
import { RemoteCompController } from './remote-comp.controller';
import { RemoteCompService } from './remote-comp.service';

describe('RemoteCompController', () => {
  let controller: RemoteCompController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RemoteCompController],
      providers: [RemoteCompService],
    }).compile();

    controller = module.get<RemoteCompController>(RemoteCompController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
