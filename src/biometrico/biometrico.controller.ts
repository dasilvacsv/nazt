import { Controller, Get, Res, HttpStatus, Post, Body, HttpCode, Param, BadRequestException } from '@nestjs/common';
import { BiometricoService } from './biometrico.service';
import { Response } from 'express';
import { CreateZKTecoUserDto } from './dto/create-zktecouser.dto';

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
                return res.status(HttpStatus.OK).json({ message: "There are no attendance logs." });
            }
            res.status(HttpStatus.OK).json({ attendances });
        } catch (error) {
            console.error(error);
            let status = HttpStatus.INTERNAL_SERVER_ERROR;
            let message = 'Error retrieving attendance logs, please try again later.';

            // Customize the response if it's a timeout error
            if (error.message.includes('timed out')) {
                status = HttpStatus.REQUEST_TIMEOUT;
                message = 'Request timed out, please try again.';
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
        throw new BadRequestException(`Invalid UID "${uid}"`);
      }
      return this.biometricoService.getZKTecoUserByUid(userUid);
    }

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