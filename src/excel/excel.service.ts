import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { Client } from 'pg';

@Injectable()
export class ExcelService {
  async generateExcelFile(): Promise<Buffer> {
    const client = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'estable',
      password: '',
      port: 5432,
    });

    try {
      await client.connect();
      const res = await client.query('SELECT * FROM empleado');
      
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Asistencia');

      // Agregar estilo a la cabecera
      const headerRow = worksheet.getRow(1); // Obtener la primera fila (cabecera)
      headerRow.getCell(1).value = 'Cédula'; // Asignar valor a la celda de la primera columna
      headerRow.getCell(2).value = 'Primer Nombre'; // Asignar valor a la celda de la segunda columna
      headerRow.eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFF0000' }, // Color de fondo rojo para las celdas de encabezado
        };
        cell.font = {
          color: { argb: 'FFFFFFFF' }, // Color de fuente blanco para las celdas de encabezado
        };
      });

      // Agregar encabezados de columna al archivo Excel
      worksheet.columns = [
        { header: 'Cédula', key: 'cedula_e' },
        { header: 'Primer Nombre', key: 'nombre1_e' },
        // Agregar más columnas según la estructura de tu tabla
      ];

      // Aplicar estilo a las celdas de datos
      let isGray = false; // Variable para alternar el color de fondo
      res.rows.forEach((row) => {
        worksheet.addRow(row).eachCell((cell) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: isGray ? 'FFD3D3D3' : 'FFFFFFFF' }, // Alternar entre gris y blanco
          };
        });
        isGray = !isGray; // Alternar el color para la siguiente fila
      });

      // Generar el archivo Excel en memoria
      const currentDate = new Date().toISOString().slice(0, 10); // Obtener la fecha actual en el formato deseado (YYYY-MM-DD)
      const fileName = `Asistencia_${currentDate}.xlsx`; // Nombre del archivo con la fecha actual

      // Establecer el nombre del archivo en la cabecera de la respuesta
      workbook.creator = 'Asistencia';
      workbook.title = fileName
      workbook.lastModifiedBy = 'Asistencia';
      workbook.created = new Date();
      workbook.modified = new Date();
      const buffer = await workbook.xlsx.writeBuffer();

      return Buffer.from(buffer);
    } catch (error) {
      throw new InternalServerErrorException('Error al generar el archivo de Excel');
    } finally {
      await client.end();
    }
  }
}