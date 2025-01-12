import { Test, TestingModule } from '@nestjs/testing';
import { OpenLibraryController } from './open-library.controller';

describe('OpenLibraryController', () => {
  let controller: OpenLibraryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpenLibraryController],
    }).compile();

    controller = module.get<OpenLibraryController>(OpenLibraryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
