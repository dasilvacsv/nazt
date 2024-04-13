import { ApiProperty } from "@nestjs/swagger";

export class CreatePaisDto {
    @ApiProperty({example: 'País de Prueba', description: 'Nombre del país'})
    nombre_pais: string;

    @ApiProperty({example: true, description: 'Estatus del país'})
    status_pais: boolean;
  }
  