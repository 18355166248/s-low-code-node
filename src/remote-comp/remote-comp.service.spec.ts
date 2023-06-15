import { Test, TestingModule } from '@nestjs/testing';
import { RemoteCompService } from './remote-comp.service';

describe('RemoteCompService', () => {
  let service: RemoteCompService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemoteCompService],
    }).compile();

    service = module.get<RemoteCompService>(RemoteCompService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
