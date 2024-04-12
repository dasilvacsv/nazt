import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Municipio } from '../entities/municipio.entity';
import { MunicipioService } from './municipio.service';


describe('MunicipioService', () => {
  let service: MunicipioService;
  let mockRepository: Partial<Repository<Municipio>>;
  beforeEach(async () => {
    mockRepository = {
      create: jest.fn().mockImplementation(dto => dto),
      save: jest.fn().mockResolvedValue(mockMunicipio),
      find: jest.fn().mockResolvedValue([mockMunicipio]),
      findOne: jest.fn().mockResolvedValue(mockMunicipio),
      update: jest.fn().mockResolvedValue(null),
      delete: jest.fn().mockResolvedValue(null),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MunicipioService,
        {
          provide: getRepositoryToken(Municipio),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<MunicipioService>(MunicipioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  it('should find municipios by estadoId', async () => {
    const estadoId = 1; 
    await service.findByEstadoId(estadoId);
    expect(mockRepository.find).toHaveBeenCalledWith({
      where: { id_estado_id: estadoId }
    });
  });

  const mockMunicipio: Partial<Municipio> = {
    id_municipio: 1,
    nombre_mu: 'Test Municipio',
    status_mu: true,
    cod_postal_mu: 12345,
    id_estado_id: 1,
  };
});

