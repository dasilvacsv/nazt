import { Injectable, InternalServerErrorException, NotFoundException, Logger } from '@nestjs/common';
const ZKLib = require('zklib-32ble');
import { CreateZKTecoUserDto } from './dto/create-zktecouser.dto';
import { EmpleadoService } from '../empleado/empleado.service';
import { Biometrico } from './entitites/biometrico.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AsistenciaService } from 'src/asistencia/asistencia.service';

@Injectable()
export class BiometricoService {
  private readonly timeoutMs: number = 5000; 
  private readonly logger = new Logger(BiometricoService.name);

  constructor(
    private empleadoService: EmpleadoService,
    @InjectRepository(Biometrico)
    private biometricoRepository: Repository<Biometrico>,
    private asistenciaService: AsistenciaService,
  ) {}

  private async withTimeout(promise: Promise<any>, ms: number): Promise<any> {
    const timeoutPromise = new Promise((_resolve, reject) => {
      const id = setTimeout(() => {
        clearTimeout(id);
        reject(new Error("Operation timed out"));
      }, ms);
    });
    return Promise.race([promise, timeoutPromise]);
  }

  async executeOperation(operation: (zkInstance: any) => Promise<any>): Promise<any> {
    const zkInstance = new ZKLib("192.168.1.230", 4370, 5200, 5000);
    try {
      await zkInstance.createSocket();
      return await this.withTimeout(operation(zkInstance), this.timeoutMs);
    } catch (error) {
      console.error('Error during ZK operation:', error);
      throw new InternalServerErrorException('ZK operation failed');
    } finally {
      try {
        await zkInstance.disconnect();
      } catch (disconnectError) {
        console.error('Failed to disconnect:', disconnectError);
      }
    }
  }

  async getZKTecoUsers(): Promise<any> {
    return this.executeOperation(zk => zk.getUsers());
  }

  async getZKTecoAttendances(): Promise<any> {
    return this.executeOperation(async zk => {
        const attendances = await zk.getAttendances();
        this.logger.debug(`Received attendances: ${JSON.stringify(attendances)}`);
        return attendances;
    }).catch(error => {
        this.logger.error('Error fetching attendances:', error);
        throw new InternalServerErrorException('Error fetching attendances from device');
    });
}


  async getZKTecoTime(): Promise<any> {
    return this.executeOperation(zk => zk.getTime());
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
