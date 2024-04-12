import { Test, TestingModule } from '@nestjs/testing';
import { EmpleadoService } from './empleado.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Empleado } from './empleado.entity';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { NotFoundException } from '@nestjs/common';

describe('EmpleadoService', () => {
  let service: EmpleadoService;
  let repository: Repository<Empleado>;

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest.fn().mockImplementation((empleado) => Promise.resolve({ id_empleado: Date.now(), ...empleado })),
      find: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockImplementation((id) => Promise.resolve({ id_empleado: id, cedula_e: '1234567890' })),
      update: jest.fn().mockResolvedValue({ affected: 1 }),
      delete: jest.fn().mockResolvedValue({ affected: 1 }),
    };

    

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmpleadoService,
        {
          provide: getRepositoryToken(Empleado),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<EmpleadoService>(EmpleadoService);
    repository = module.get<Repository<Empleado>>(getRepositoryToken(Empleado));

    jest.spyOn(repository, 'findOne').mockImplementation((options: any) => {
      const whereClause = options.where as FindOptionsWhere<Empleado>;
      
      if ('id_empleado' in whereClause && whereClause.id_empleado === 1) {
        return Promise.resolve({
          id_empleado: 1,
          cedula_e: '1234567890',
          nombre1_e: 'John',
        });
      }
      return Promise.resolve(null);
    });
    
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
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

    expect(await service.create(createEmpleadoDto)).toEqual({
      id_empleado: expect.any(Number),
      ...createEmpleadoDto,
    });
    expect(repository.create).toHaveBeenCalledWith(createEmpleadoDto);
    expect(repository.save).toHaveBeenCalledWith(createEmpleadoDto);
  });

  it('should find all empleados', async () => {
    await service.findAll();
    expect(repository.find).toHaveBeenCalled();
  });

 it('should find one empleado by id', async () => {
  const id = 1;
  const expected = {
    id_empleado: 1,
    cedula_e: '1234567890',
    nombre1_e: 'John',
  };
  await expect(service.findOne(id)).resolves.toEqual(expect.objectContaining(expected));
  expect(repository.findOne).toHaveBeenCalledWith({ where: { id_empleado: id } });
});

  it('should throw NotFoundException if empleado to find does not exist', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should update an empleado', async () => {
    const updateEmpleadoDto: CreateEmpleadoDto = { cedula_e: '9876543210', nombre1_e: 'Updated', nombre2_e: 'Name', apellido1_e: 'Smith', apellido2_e: 'Jones', fecha_nac_e: new Date(), sexo_e: 'F' };
    await service.update(1, updateEmpleadoDto);
    expect(repository.update).toHaveBeenCalledWith(1, updateEmpleadoDto);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id_empleado: 1 } });
  });

  it('should patch an empleado', async () => {
    const updates = { nombre1_e: 'Patched' };
    await service.patch(1, updates);
    expect(repository.update).toHaveBeenCalledWith(1, updates);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id_empleado: 1 } });
  });

  it('should remove an empleado', async () => {
    await service.remove(1);
    expect(repository.delete).toHaveBeenCalledWith(1);
  });

});