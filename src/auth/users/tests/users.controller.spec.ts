import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { UserResponseDto } from '../dto/response.dto';
import { SignUpDto } from '../dto/signup.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let mockUsersService: Partial<UsersService>;

  beforeEach(async () => {
    mockUsersService = {
      createUser: jest.fn().mockImplementation((dto: SignUpDto) => Promise.resolve({ id_usuario: 1, ...dto })),
      updateUser: jest.fn().mockImplementation((id: number, dto: UpdateUserDto) => Promise.resolve({ id_usuario: id, ...dto })),
      getUserByEmail: jest.fn().mockImplementation((email: string) => Promise.resolve({ id_usuario: 1, id_correo: email })),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const newUser: SignUpDto = { id_correo: 'test@example.com', clave_u: 'Password123', id_empleado_id: 1 };
    await expect(controller.signUp(newUser)).resolves.toEqual({
      id_usuario: expect.any(Number),
      ...newUser,
    });
    expect(mockUsersService.createUser).toHaveBeenCalledWith(newUser);
  });

  it('should update a user', async () => {
    const updatedUser: UpdateUserDto = { clave_u: 'NewPassword' };
    await expect(controller.updateUser(1, updatedUser)).resolves.toEqual({
      id_usuario: 1,
      ...updatedUser,
    });
    expect(mockUsersService.updateUser).toHaveBeenCalledWith(1, updatedUser);
  });

  it('should get a user by email', async () => {
    const email = 'test@example.com';
    await expect(controller.getUserByEmail(email)).resolves.toEqual({ id_usuario: 1, id_correo: email });
    expect(mockUsersService.getUserByEmail).toHaveBeenCalledWith(email);
  });
});
