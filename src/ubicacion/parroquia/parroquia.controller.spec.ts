import { Test, TestingModule } from '@nestjs/testing';
import { ParroquiaController } from './parroquia.controller';
import { ParroquiaService } from './parroquia.service';
import { Parroquia } from '../entities/parroquia.entity';

describe('ParroquiaController', () => {
  let controller: ParroquiaController;
  let mockParroquiaService: Partial<ParroquiaService>;

  beforeEach(async () => {
    mockParroquiaService = {
      create: jest.fn().mockResolvedValue(mockParroquia),
      findAll: jest.fn().mockResolvedValue([mockParroquia]),
      findOne: jest.fn().mockResolvedValue(mockParroquia),
      update: jest.fn().mockResolvedValue(mockParroquia),
      remove: jest.fn().mockResolvedValue(undefined),
      findByMunicipioId: jest.fn().mockResolvedValue([mockParroquia]), // Mock the foreign key relation method
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParroquiaController],
      providers: [
        {
          provide: ParroquiaService,
          useValue: mockParroquiaService,
        },
      ],
    }).compile();
    controller = module.get<ParroquiaController>(ParroquiaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get parroquia by municipioId', async () => {
    const municipioId = 1; 
    const result = await controller.findByMunicipioId(municipioId);
    expect(result).toEqual([mockParroquia]);
    expect(mockParroquiaService.findByMunicipioId).toHaveBeenCalledWith(municipioId);
  });

  const mockParroquia: Partial<Parroquia> = {
    id_parroquia: 1,
    nombre_pa: 'Test Parroquia',
    status_pa: true,
    id_municipio_id: 1,
  };
}

);