import { Injectable, NotFoundException, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Empleado } from './empleado.entity';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { procesarCedula } from 'src/common/cedula';

@Injectable()
export class EmpleadoService {
  constructor(
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,
  ) { }

  async create(createEmpleadoDto: CreateEmpleadoDto) {
    try {
      const empleado = this.empleadoRepository.create(createEmpleadoDto);
      await this.empleadoRepository.save(empleado);
      return empleado;
    } catch (error) {
      console.error('Error al crear empleado:', error);
      if (error.code === '23505') {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: 'La cédula proporcionada ya está registrada.',
        }, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Error al registrar el empleado: ' + error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    return this.empleadoRepository.find();
  }

  async findOne(id: number): Promise<Empleado> {
    const empleado = await this.empleadoRepository.findOne({ where: { id_empleado: id } });
    if (!empleado) {
      throw new NotFoundException(`Empleado con ID "${id}" no encontrado`);
    }
    return empleado;
  }

  async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto) {
    await this.empleadoRepository.update(id, updateEmpleadoDto);
    return this.findOne(id);
  }

  async patch(id: number, updates: any): Promise<Empleado> {
    const result = await this.empleadoRepository.update(id, updates);
    if (result.affected === 0) {
      throw new NotFoundException(`Empleado con ID "${id}" no encontrado`);
    }
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.empleadoRepository.delete(id);
  }

  async findAllBasicData() {
    return this.empleadoRepository.createQueryBuilder('empleado')
      .select([
        'empleado.id_empleado',
        'empleado.cedula_e',
        'empleado.nombre1_e',
        'empleado.nombre2_e',
        'empleado.apellido1_e',
        'empleado.apellido2_e',
        'empleado.fecha_nac_e',
        'empleado.id_emp_carg',
        'empleado.reg_biometrico_e',
      ])
      .getMany();
  }

  async empleadosBiometrico(): Promise<number> {
    return this.empleadoRepository.count({
        where: {
            reg_biometrico_e: Not(IsNull()),
        },
    });
}

  // Biométrico
  async findByCedula(cedula: string): Promise<Empleado | undefined> {
    const empleados = await this.empleadoRepository.find();
    return empleados.find(empleado => procesarCedula(empleado.cedula_e) === cedula);
  }

  // Método para actualizar un empleado
  async updateEmpleado(id: number, updateData: Partial<Empleado>): Promise<Empleado> {
    // Primero, verifica que el empleado exista
    const empleado = await this.empleadoRepository.findOne({ where: { id_empleado: id } });
    if (!empleado) {
      throw new Error(`Empleado con ID ${id} no encontrado`);
    }

    // Actualizar el empleado con los nuevos datos
    await this.empleadoRepository.update(id, updateData);

    // Devolver el empleado actualizado
    return this.empleadoRepository.findOne({ where: { id_empleado: id } });



  }
}




