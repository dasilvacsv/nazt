import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ExcelService } from './excel.service';
import { InternalServerErrorException } from '@nestjs/common';

@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Get('generate')
  async generateExcel(@Res() res: Response) {
    try {
      const buffer = await this.excelService.generateExcelFile();

      // Enviar el archivo Excel como respuesta
      res.set({
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename=asistencia.xlsx',
      });
      res.send(buffer);
    } catch (error) {
      throw new InternalServerErrorException('Error al generar el archivo de Excel');
    }
  }
}

