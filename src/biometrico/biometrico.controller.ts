import { Controller, Get, Res, HttpStatus, Post, Body, HttpCode, Param, BadRequestException } from '@nestjs/common';
import { BiometricoService } from './biometrico.service';
import { Response } from 'express';
import { CreateZKTecoUserDto } from './dto/create-zktecouser.dto';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Biometrico Interacción')
@Controller('biometrico')
export class BiometricoController {
    constructor(private readonly biometricoService: BiometricoService) { }

    @Get('time')
    async getZKTecoTime(@Res() res: Response) {
        try {
            const time = await this.biometricoService.getZKTecoTime();
            res.json({ time });
        } catch (error) {
            console.log(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    @Get('asistencia')
    async getZKTecoAttendances(@Res() res: Response) {
        try {
            const attendances = await this.biometricoService.getZKTecoAttendances();
            if (!attendances || attendances.length === 0) {
                return res.status(HttpStatus.OK).json({ message: "No hay registros de asistencia" });
            }
            res.status(HttpStatus.OK).json({ attendances });
        } catch (error) {
            console.error(error);
            let status = HttpStatus.INTERNAL_SERVER_ERROR;
            let message = 'Ha ocurrido un error al intentar obtener los datos de asistencia';

            if (error.message.includes('timed out')) {
                status = HttpStatus.REQUEST_TIMEOUT;
                message = 'El servidor ZKTeco no responde. Por favor, intente más tarde';
            }

            res.status(status).json({
                message: message,
                error: error.message,
            });
        }
    }

    @Get('usuarios')
    async getZKTecoUsers(@Res() res: Response) {
        try {
            const users = await this.biometricoService.getZKTecoUsers();
            res.json({ users });
        } catch (error) {
            console.log(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    @Get('usuarios/uid/:uid')
    async getZKTecoUserByUid(@Param('uid') uid: string) {
      const userUid = parseInt(uid);
      if (isNaN(userUid)) {
        throw new BadRequestException(`UID inválido "${uid}"`);
      }
      return this.biometricoService.getZKTecoUserByUid(userUid);
    }

    @ApiProperty({ description: 'Borra un usuario en el dispositivo ZKTeco' })
    @Post('usuarios')
    @HttpCode(HttpStatus.CREATED)
    async createZKTecoUser(@Body() createZKTecoUserDto: CreateZKTecoUserDto) {
        return this.biometricoService.createZKTecoUser(createZKTecoUserDto);
    }

    @Post('asistencia')
    async deleteZKTecoAttLogs(@Res() res: Response) {
        try {
            const result = await this.biometricoService.deleteZKTecoAttLogs();
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

}