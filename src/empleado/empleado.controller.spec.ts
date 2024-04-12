import { Test, TestingModule } from '@nestjs/testing';
import { EmpleadoController } from './empleado.controller';
import { EmpleadoService } from './empleado.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';

describe('EmpleadoController', () => {
  let controller: EmpleadoController;
  let service: EmpleadoService;

  beforeEach(async () => {
    const mockEmpleadoService = {
      create: jest.fn(dto => dto),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      patch: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmpleadoController],
      providers: [
        {
          provide: EmpleadoService,
          useValue: mockEmpleadoService,
        },
      ],
    }).compile();

    controller = module.get<EmpleadoController>(EmpleadoController);
    service = module.get<EmpleadoService>(EmpleadoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an empleado', async () => {
    const createEmpleadoDto: CreateEmpleadoDto = {
      cedula_e: '1234567890',
      nombre1_e: 'John',
      nombre2_e: 'Doe',
      apellido1_e: 'Smith',
      apellido2_e: 'Jones',
      fecha_nac_e: new Date(),
      sexo_e: 'M',
    };
    await controller.create(createEmpleadoDto);
    expect(service.create).toHaveBeenCalledWith(createEmpleadoDto);
  });

  it('should find all empleados', async () => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one empleado', async () => {
    await controller.findOne(1);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update an empleado', async () => {
    const updateEmpleadoDto: CreateEmpleadoDto = {
      cedula_e: '1234567890',
      nombre1_e: 'John',
      nombre2_e: 'Doe',
      apellido1_e: 'Smith',
      apellido2_e: 'Jones',
      fecha_nac_e: new Date(),
      sexo_e: 'M',
    };
    await controller.update(1, updateEmpleadoDto);
    expect(service.update).toHaveBeenCalledWith(1, updateEmpleadoDto);
  });

  it('should patch an empleado', async () => {
    const updates = { nombre1_e: 'Jane' };
    await controller.patch(1, updates);
    expect(service.patch).toHaveBeenCalledWith(1, updates);
  });

  it('should remove an empleado', async () => {
    await controller.remove(1);
    expect(service.remove).toHaveBeenCalledWith(1);
  });

});

