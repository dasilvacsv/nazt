import { Test, TestingModule } from '@nestjs/testing';
import { PaisService } from './pais.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Pais } from '../entities/pais.entity';

describe('PaisService', () => {
  let service: PaisService;
  let mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(pais => Promise.resolve({ id_pais: Date.now(), ...pais })),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaisService,
        {
          provide: getRepositoryToken(Pais),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PaisService>(PaisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new pais record', async () => {
    const paisDto = { nombre_pais: 'Test Pais', status_pais: true };
    expect(await service.create(paisDto)).toEqual({
      id_pais: expect.any(Number),
      ...paisDto,
    });

    expect(mockRepository.create).toHaveBeenCalledWith(paisDto);
    expect(mockRepository.save).toHaveBeenCalled();
  });
});
