import { ApiProperty } from "@nestjs/swagger";

export class CreateCargoDto {
    @ApiProperty({ example: 'Cargo de Prueba', description: 'Nombre del cargo' })
    nombre_car: string;

    @ApiProperty({ example: true, description: 'Estatus del cargo bool' })
    status_car: boolean;

    @ApiProperty({ example: 'Tipo de cargo', description: 'Tipo de cargo' })
    tipo_cargo: string;

    @ApiProperty({ example: 1, description: 'Id del departamento, llave foránea' })  
    id_carg_id: number;
  }
