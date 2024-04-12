import { Injectable, ConflictException, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { SignUpDto } from './dto/signup.dto';
import { UserResponseDto } from './dto/response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) { }

  async createUser(signUpDto: SignUpDto): Promise<UserResponseDto> {
  const errors = await validate(signUpDto);
  if (errors.length > 0) {
    throw new BadRequestException('Validation failed');
  }

  const { id_correo, clave_u, id_empleado_id } = signUpDto;

  try {
    const hashedPassword = await bcrypt.hash(clave_u, 10);
    const newUser = this.usuariosRepository.create({
      id_correo,
      clave_u: hashedPassword,
      empleado: { id_empleado: id_empleado_id },
      create_u: new Date(), 
      update_u: new Date(), 
    });

    await this.usuariosRepository.save(newUser);
    return plainToClass(UserResponseDto, newUser, {
      excludeExtraneousValues: true,
    });
  } catch (error) {
    if (error?.code === '23505') {
      throw new ConflictException('El usuario registrado con este correo electrónico ya existe.');
    } else {

      console.error(error);
      throw new InternalServerErrorException('Erorr al crear el usuario. Por favor, inténtelo de nuevo.');
    }
  }
}

  async updateUser(id_usuario: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const user = await this.usuariosRepository.findOne({ where: { id_usuario } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado!');
    }
  
    if (updateUserDto.clave_u) {
      user.clave_u = await bcrypt.hash(updateUserDto.clave_u, 10);
    }
  
  
    await this.usuariosRepository.save(user);
    return plainToClass(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async getUserByEmail(email: string): Promise<UserResponseDto | null> {
    const user = await this.usuariosRepository.findOne({ where: { id_correo: email } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return plainToClass(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async getUserById(id: number): Promise<UserResponseDto | null> {
    const user = await this.usuariosRepository.findOneBy({ id_usuario: id });
    if (!user) {
      return null;
    }
    return plainToClass(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async getUserByEmailForAuth(email: string): Promise<Usuario | null> {
    return await this.usuariosRepository.findOne({
      where: { id_correo: email },
      select: ['id_usuario', 'id_correo', 'clave_u']
    });
  }

}