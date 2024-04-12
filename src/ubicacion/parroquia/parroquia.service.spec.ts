import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Parroquia } from '../entities/parroquia.entity';
import { ParroquiaService } from './parroquia.service';

describe('ParroquiaService', () => {
  let service: ParroquiaService;
  let mockRepository: Partial<Repository<Parroquia>>;
  beforeEach(async () => {
    mockRepository = {
      create: jest.fn().mockImplementation(dto => dto),
      save: jest.fn().mockResolvedValue(mockParroquia),
      find: jest.fn().mockResolvedValue([mockParroquia]),
      findOne: jest.fn().mockResolvedValue(mockParroquia),
      update: jest.fn().mockResolvedValue(null),
      delete: jest.fn().mockResolvedValue(null),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParroquiaService,
        {
          provide: getRepositoryToken(Parroquia),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ParroquiaService>(ParroquiaService);
  });


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find parroquias by municipioId', async () => {
    const municipioId = 1; // Example municipioId
    await service.findByMunicipioId(municipioId);
    expect(mockRepository.find).toHaveBeenCalledWith({
      where: { id_municipio_id: municipioId }
    });
  });

  const mockParroquia: Partial<Parroquia> = {
    id_parroquia: 1,
    nombre_pa: 'Test Parroquia',
    status_pa: true,
    id_municipio_id: 1,
  };
});