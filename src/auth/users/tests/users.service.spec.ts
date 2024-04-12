import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Usuario } from '../../entities/usuario.entity';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let mockRepository: Partial<Repository<Usuario>>;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn().mockImplementation(dto => dto),
      save: jest.fn().mockImplementation(user => Promise.resolve({ id_usuario: Date.now(), ...user })),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(Usuario), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create and save a user', async () => {
    const newUser = { id_correo: 'test@example.com', clave_u: 'Password123', id_empleado_id: 1 };
    const savedUser = await service.createUser(newUser);
    expect(savedUser).toEqual(expect.objectContaining(newUser));
    expect(mockRepository.create).toHaveBeenCalledWith(newUser);
    expect(mockRepository.save).toHaveBeenCalledWith(newUser);
  });

  it('should update and save a user', async () => {
    const updatedUser = { clave_u: 'NewPassword' };
    const userId = 1;
    const user = { id_usuario: userId, clave_u: 'Password123' };
    mockRepository.findOne = jest.fn().mockResolvedValue(user);
    const savedUser = await service.updateUser(userId, updatedUser);
    expect(savedUser).toEqual(expect.objectContaining({ id_usuario: userId, ...updatedUser }));
    expect(mockRepository.findOne).toHaveBeenCalledWith({ id_usuario: userId });
    expect(mockRepository.save).toHaveBeenCalledWith({ ...user, ...updatedUser });
  });

  it('should get a user by email', async () => {
    const email = 'test@example.com';
    const user = { id_usuario: 1, id_correo: email };
    mockRepository.findOne = jest.fn().mockResolvedValue(user);
    const foundUser = await service.getUserByEmail(email);
    expect(foundUser).toEqual(user);
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id_correo: email } });
  });
});
