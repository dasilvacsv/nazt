import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
const ZKLib = require('zklib-32ble');
import { CreateZKTecoUserDto } from './dto/create-zktecouser.dto';
import { EmpleadoService } from '../empleado/empleado.service';
import { Biometrico } from './entitites/biometrico.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BiometricoService {
  constructor(
    private empleadoService: EmpleadoService,
    @InjectRepository(Biometrico)
    private biometricoRepository: Repository<Biometrico>, 
  ) {}

  async getZKTecoTime(): Promise<any> {
    let zkInstance = new ZKLib("192.168.1.230", 4370, 5200, 5000);
    try {
      await zkInstance.createSocket();
      const time = await zkInstance.getTime();
      await zkInstance.disconnect();
      return time;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async getZKTecoAttendances(): Promise<any> {
    let zkInstance = new ZKLib("192.168.1.230", 4370, 5200, 5000);

    const timeoutPromise = new Promise((resolve, reject) => {
      const id = setTimeout(() => {
        clearTimeout(id);
        reject(new Error("Operation timed out after 6 seconds"));
      }, 6000);
    });

    try {
      await zkInstance.createSocket();

      const attendances = await Promise.race([
        zkInstance.getAttendances(),
        timeoutPromise,
      ]);

      await zkInstance.disconnect();
      return attendances || []; 
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getZKTecoUsers(): Promise<any> {
    let zkInstance = new ZKLib("192.168.1.230", 4370, 5200, 5000);
    try {
      await zkInstance.createSocket();
      const users = await zkInstance.getUsers();
      await zkInstance.disconnect();
      return users;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async getZKTecoUserByUid(uid: number): Promise<any> {
    let zkInstance = new ZKLib("192.168.1.230", 4370, 5200, 5000);
    try {
      await zkInstance.createSocket();
      let users = await zkInstance.getUsers();
      await zkInstance.disconnect();

      if (!users || !users.data || !Array.isArray(users.data)) {
        throw new NotFoundException(`Los datos de usuarios no están disponibles`);
      }

      const user = users.data.find(user => user.uid === uid);

      if (!user) {
        throw new NotFoundException(`Usuario con UID "${uid}" no encontrado`);
      }

      return user;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }


  async createZKTecoUser(createZKTecoUserDto: CreateZKTecoUserDto): Promise<any> {
    const zkInstance = new ZKLib("192.168.1.230", 4370, 5200, 5000);
  
    try {
      await zkInstance.createSocket();
      await zkInstance.setUser(
        createZKTecoUserDto.uid,
        createZKTecoUserDto.userid,
        createZKTecoUserDto.name,
        createZKTecoUserDto.password,
        createZKTecoUserDto.role,
        createZKTecoUserDto.cardno 
      );
  
      const cedula = createZKTecoUserDto.cardno;
      const empleado = await this.empleadoService.findByCedula(cedula);
  
      if (empleado) {
        await this.empleadoService.updateEmpleado(empleado.id_empleado, { reg_biometrico_e: createZKTecoUserDto.uid });
  
        const biometrico = this.biometricoRepository.create({
          uid: createZKTecoUserDto.uid,
          userId: createZKTecoUserDto.userid,
          name: createZKTecoUserDto.name,
          password: createZKTecoUserDto.password,
          role: createZKTecoUserDto.role,
          cardNo: createZKTecoUserDto.cardno,
        });
        await this.biometricoRepository.save(biometrico);
      } else {
        console.error('Empleado no encontrado con la cédula:', cedula);
        throw new NotFoundException(`Empleado no encontrado con la cédula: ${cedula}`);
      }
  
      await zkInstance.disconnect();
      return { message: "Usuario de ZKTeco creado exitosamente, empleado y registro biométrico actualizados" };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }
  
  

  

  async deleteZKTecoAttLogs(): Promise<{ message: string }> {
    const zkInstance = new ZKLib("192.168.1.230", 4370, 5200, 5000);
    try {
      await zkInstance.createSocket();
      await zkInstance.clearAttendanceLog();
      await zkInstance.disconnect();
      return { message: "Los datos de asistencia han sido borrados exitosamente" };
    } catch (error) {
      console.error(error);
      throw new Error('Ha ocurrido un error al intentar borrar los datos de asistencia');
    }



  }
}
