import { Controller, Get, HttpException, HttpStatus, Injectable, Logger, Post } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { BiometricoService } from '../biometrico/biometrico.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CRUD Asistencia')
@Controller('asistencia')
@Injectable()
export class AsistenciaController {
    private readonly logger = new Logger(AsistenciaController.name);

    constructor(
        private asistenciaService: AsistenciaService,
        private biometricoService: BiometricoService
    ) {}


    @Get('/all')
    async getAllAttendances(): Promise<any> {
        this.logger.log('Obteniendo todos los registros de asistencia...');
        try {
            const attendances = await this.asistenciaService.getAllAsistencias();
            return attendances;
        } catch (error) {
            this.logger.error('No se pudieron obtener los registros de asistencia', error.stack);
            throw new HttpException('Hubo un error al obtener los registros de asistencia', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/guardar')
    async fetchAndStoreAttendances(): Promise<any> {
        this.logger.log('Obteniendo los registros de asistencia desde el dispositivo...');
        try {
            const response = await this.biometricoService.getZKTecoAttendances();
            if (!response || !response.data) {
                this.logger.error('Datos inválidos de asistencia');
                throw new HttpException('Formato inválido de datos de asistencia', HttpStatus.BAD_REQUEST);
            }

            const attendances = response.data;
            const results = [];
            for (const attendance of attendances) {
                this.logger.log(`Procesando asistencia para usuario ID: ${attendance.userSn}`);
                const result = await this.asistenciaService.addOrUpdateAsistencia({
                    userSn: attendance.userSn,
                    recordTime: attendance.recordTime
                });
                results.push(result);
            }
            return results;
        } catch (error) {
            this.logger.error('Fallo al obtener y guardar datos de asistencia', error.stack);
            throw new HttpException('Fallo al obtener y guardar los datos de asistencia', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
