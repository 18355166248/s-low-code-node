import { Test, TestingModule } from '@nestjs/testing';
import { RemoteCompVersionService } from './remote-comp-version.service';

describe('RemoteCompVersionService', () => {
  let service: RemoteCompVersionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemoteCompVersionService],
    }).compile();

    service = module.get<RemoteCompVersionService>(RemoteCompVersionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
