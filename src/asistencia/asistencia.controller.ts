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
        this.logger.log('Fetching all attendance records...');
        try {
            const attendances = await this.asistenciaService.getAllAsistencias();
            return attendances;
        } catch (error) {
            this.logger.error('Failed to fetch attendance records', error.stack);
            throw new HttpException('Failed to fetch attendance records', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/guardar')
    async fetchAndStoreAttendances(): Promise<any> {
        this.logger.log('Fetching attendance records from ZKTeco device...');
        try {
            const response = await this.biometricoService.getZKTecoAttendances();
            if (!response || !response.data) {
                this.logger.error('Invalid attendance data format or no data returned');
                throw new HttpException('Invalid attendance data format', HttpStatus.BAD_REQUEST);
            }

            const attendances = response.data;
            const results = [];
            for (const attendance of attendances) {
                this.logger.log(`Processing attendance for user ID: ${attendance.userSn}`);
                const result = await this.asistenciaService.addOrUpdateAsistencia({
                    userSn: attendance.userSn,
                    recordTime: attendance.recordTime
                });
                results.push(result);
            }
            return results;
        } catch (error) {
            this.logger.error('Failed to fetch and store attendance data', error.stack);
            throw new HttpException('Failed to fetch and store attendance data', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
