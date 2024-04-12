import { Test, TestingModule } from '@nestjs/testing';
import { DepartamentoService } from './departamento.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Departamento } from '../entities/departamento.entity';


describe('DepartamentoService', () => {
  let service: DepartamentoService;
  let mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(departamento => Promise.resolve({ id_departamento: Date.now(), ...departamento })),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepartamentoService,
        {
          provide: getRepositoryToken(Departamento),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<DepartamentoService>(DepartamentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new departamento record', async () => {
    const departamentoDto = { nombre_dep: 'Test Departamento', status_dep: true };
    expect(await service.create(departamentoDto)).toEqual({
      id_departamento: expect.any(Number),
      ...departamentoDto,
    });

    expect(mockRepository.create).toHaveBeenCalledWith(departamentoDto);
    expect(mockRepository.save).toHaveBeenCalled();
  });
});


