import { Test, TestingModule } from '@nestjs/testing';
import { MunicipioController } from './municipio.controller';
import { MunicipioService } from './municipio.service';
import { Municipio } from '../entities/municipio.entity';

describe('MunicipioController', () => {
  let controller: MunicipioController;
  let mockMunicipioService: Partial<MunicipioService>;

  beforeEach(async () => {
    mockMunicipioService = {
      create: jest.fn().mockResolvedValue(mockMunicipio),
      findAll: jest.fn().mockResolvedValue([mockMunicipio]),
      findOne: jest.fn().mockResolvedValue(mockMunicipio),
      update: jest.fn().mockResolvedValue(mockMunicipio),
      remove: jest.fn().mockResolvedValue(undefined),
      findByEstadoId: jest.fn().mockResolvedValue([mockMunicipio]), // Mock the foreign key relation method
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MunicipioController],
      providers: [
        {
          provide: MunicipioService,
          useValue: mockMunicipioService,
        },
      ],
    }).compile();

    controller = module.get<MunicipioController>(MunicipioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get municipio by estadoId', async () => {
    const estadoId = 1; 
    const result = await controller.findByEstadoId(estadoId);
    expect(result).toEqual([mockMunicipio]);
    expect(mockMunicipioService.findByEstadoId).toHaveBeenCalledWith(estadoId);
  });

  const mockMunicipio: Partial<Municipio> = {
    id_municipio: 1,
    nombre_mu: 'Test Municipio',
    status_mu: true,
    cod_postal_mu: 12345,
    id_estado_id: 1,
  };
});

  