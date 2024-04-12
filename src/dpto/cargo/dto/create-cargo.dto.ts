import { ApiProperty } from "@nestjs/swagger";

export class CreateCargoDto {
    @ApiProperty({ example: '1', description: 'Id del cargo' })
    nombre_ca: string;

    @ApiProperty({ example: true, description: 'Estatus del cargo bool' })
    status_ca: boolean;

    @ApiProperty({ example: 1, description: 'Id del departamento, llave foránea' })  
    id_carg_id: number;
  }
