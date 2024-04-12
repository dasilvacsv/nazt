import { Test, TestingModule } from '@nestjs/testing';
import { CargoController } from './cargo.controller';
import { CargoService } from './cargo.service';
import { Cargo } from '../entities/cargo.entity';

describe('CargoController', () => {
  let controller: CargoController;
  let mockCargoService: Partial<CargoService>;

  beforeEach(async () => {
    mockCargoService = {
      create: jest.fn().mockResolvedValue(mockCargo),
      findAll: jest.fn().mockResolvedValue([mockCargo]),
      findOne: jest.fn().mockResolvedValue(mockCargo),
      update: jest.fn().mockResolvedValue(mockCargo),
      remove: jest.fn().mockResolvedValue(undefined),
      findByDepartamentoId: jest.fn().mockResolvedValue([mockCargo]), // Mock the foreign key relation method
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CargoController],
      providers: [
        {
          provide: CargoService,
          useValue: mockCargoService,
        },
      ],
    }).compile();

    controller = module.get<CargoController>(CargoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get cargo by departamentoId', async () => {
    const departamentoId = 1; // Example departamentoId
    await controller.findByDepartamentoId(departamentoId);
    expect(mockCargoService.findByDepartamentoId).toHaveBeenCalledWith(departamentoId);
  });

  const mockCargo: Partial<Cargo> = {
    id_cargo: 1,
    nombre_car: 'Test Cargo',
    status_car: true,
    id_departamento_id: 1,
  };
});


