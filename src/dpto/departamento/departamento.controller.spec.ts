import { Test, TestingModule } from '@nestjs/testing';
import { DepartamentoController } from './departamento.controller';
import { DepartamentoService } from './departamento.service';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';

describe('DepartamentoController', () => {
  let controller: DepartamentoController;
  let mockDepartamentoService = {
    create: jest.fn(dto => {
      return {
        id_departamento: Date.now(),
        ...dto,
      };
    }),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartamentoController],
      providers: [
        {
          provide: DepartamentoService,
          useValue: mockDepartamentoService,
        },
      ],
    }).compile();

    controller = module.get<DepartamentoController>(DepartamentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();

  });

  it('should create a new departamento', async () => {
    const createDepartamentoDto: CreateDepartamentoDto = { nombre_dep: 'Test Departamento', status_dep: true };
    expect(await controller.create(createDepartamentoDto)).toEqual({
      id_departamento: expect.any(Number),
      ...createDepartamentoDto,
    });

    expect(mockDepartamentoService.create).toHaveBeenCalledWith(createDepartamentoDto);


  });
});


