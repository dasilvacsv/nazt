import { Test, TestingModule } from '@nestjs/testing';
import { BiometricoController } from './biometrico.controller';

describe('BiometricoController', () => {
  let controller: BiometricoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BiometricoController],
    }).compile();

    controller = module.get<BiometricoController>(BiometricoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
