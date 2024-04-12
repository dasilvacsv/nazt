import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cargo } from '../entities/cargo.entity';
import { CargoService } from './cargo.service';

describe('CargoService', () => {
  let service: CargoService;
  let mockRepository: Partial<Repository<Cargo>>;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn().mockImplementation(dto => dto),
      save: jest.fn().mockResolvedValue(mockCargo),
      find: jest.fn().mockResolvedValue([mockCargo]),
      findOne: jest.fn().mockResolvedValue(mockCargo),
      update: jest.fn().mockResolvedValue(null),
      delete: jest.fn().mockResolvedValue(null),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CargoService,
        {
          provide: getRepositoryToken(Cargo),
          useValue: mockRepository, 
        },],
    }).compile();

    service = module.get<CargoService>(CargoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get cargo by departamentoId', async () => {
    const departamentoId = 1; // Example departamentoId
    await service.findByDepartamentoId(departamentoId);
    expect(mockRepository.find).toHaveBeenCalledWith({
      where: { id_departamento_id: departamentoId }
    });
  });

  const mockCargo: Partial<Cargo> = {
    id_cargo: 1,
    nombre_car: 'Test Cargo',
    status_car: true,
    id_departamento_id: 1,
  };
});


  