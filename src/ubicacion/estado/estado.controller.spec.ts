import { Test, TestingModule } from '@nestjs/testing';
import { EstadoController } from './estado.controller';
import { EstadoService } from './estado.service';
import { Estado } from '../entities/estado.entity';


describe('EstadoController', () => {
  let controller: EstadoController;
  let mockEstadoService: Partial<EstadoService>;

  beforeEach(async () => {
    mockEstadoService = {
      create: jest.fn().mockResolvedValue(mockEstado),
      findAll: jest.fn().mockResolvedValue([mockEstado]),
      findOne: jest.fn().mockResolvedValue(mockEstado),
      update: jest.fn().mockResolvedValue(mockEstado),
      remove: jest.fn().mockResolvedValue(undefined),
      findByPaisId: jest.fn().mockResolvedValue([mockEstado]), 
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadoController],
      providers: [
        {
          provide: EstadoService,
          useValue: mockEstadoService,
        },
      ],
    }).compile();

    controller = module.get<EstadoController>(EstadoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
d
  it('should get estados by paisId', async () => {
    const paisId = 1; 
    const result = await controller.findByPaisId(paisId);
    expect(result).toEqual([mockEstado]);
    expect(mockEstadoService.findByPaisId).toHaveBeenCalledWith(paisId);
  });

});

const mockEstado: Partial<Estado> = {
  id_estado: 1,
  nombre_es: 'Test Estado',
  status_es: true,
  id_pais_id: 1,
};
