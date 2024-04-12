import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estado } from '../entities/estado.entity';
import { EstadoService } from './estado.service';

describe('EstadoService', () => {
  let service: EstadoService;
  let mockRepository: Partial<Repository<Estado>>;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn().mockImplementation(dto => dto),
      save: jest.fn().mockResolvedValue(mockEstado),
      find: jest.fn().mockResolvedValue([mockEstado]),
      findOne: jest.fn().mockResolvedValue(mockEstado),
      update: jest.fn().mockResolvedValue(null),
      delete: jest.fn().mockResolvedValue(null),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstadoService,
        {
          provide: getRepositoryToken(Estado),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<EstadoService>(EstadoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find estados by paisId', async () => {
    const paisId = 1; 
    await service.findByPaisId(paisId);
    expect(mockRepository.find).toHaveBeenCalledWith({
      where: { id_pais_id: paisId }
    });
  });

});

const mockEstado: Partial<Estado> = {
  id_estado: 1,
  nombre_es: 'Test Estado',
  status_es: true,
  id_pais_id: 1,
};
