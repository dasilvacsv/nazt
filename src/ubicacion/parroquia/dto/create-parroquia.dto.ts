import { ApiProperty } from "@nestjs/swagger";

export class CreateParroquiaDto {
    @ApiProperty({ example: 'Parroquia de Prueba', description: 'Nombre de la parroquia' })
    nombre_pa: string;

    @ApiProperty({ example: true, description: 'Estatus de la parroquia' })
    status_pa: boolean;

    @ApiProperty({ example: 12345, description: 'Id del Municipio al que pertenece la parroquia' })
    id_pa_id: number;
  }

