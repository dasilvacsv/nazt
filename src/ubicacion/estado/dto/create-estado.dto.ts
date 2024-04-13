import { ApiProperty } from "@nestjs/swagger";

export class CreateEstadoDto {
    @ApiProperty({example: 'Estado de de Prueba', description: 'Nombre del estado'})
    nombre_es: string;

    @ApiProperty({example: true, description: 'Estatus del país'})
    status_es: boolean;

    @ApiProperty({example: 1, description: 'ID del país referido'})
    id_pais_id: number;
  }

  