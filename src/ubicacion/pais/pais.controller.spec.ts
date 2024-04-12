// src/ubicacion/pais.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { PaisController } from './pais.controller';
import { PaisService } from './pais.service';
import { CreatePaisDto } from './pais/dto/create-pais.dto';

describe('PaisController', () => {
  let controller: PaisController;
  let mockPaisService = {
    create: jest.fn(dto => {
      return {
        id_pais: Date.now(),
        ...dto,
      };
    }),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaisController],
      providers: [
        {
          provide: PaisService,
          useValue: mockPaisService,
        },
      ],
    }).compile();

    controller = module.get<PaisController>(PaisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new pais', async () => {
    const createPaisDto: CreatePaisDto = { nombre_pais: 'Test Pais', status_pais: true };
    expect(await controller.create(createPaisDto)).toEqual({
      id_pais: expect.any(Number),
      ...createPaisDto,
    });

    expect(mockPaisService.create).toHaveBeenCalledWith(createPaisDto);
  });
});
