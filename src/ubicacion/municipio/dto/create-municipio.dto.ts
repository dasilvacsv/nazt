import { ApiProperty } from "@nestjs/swagger";

export class CreateMunicipioDto {
    @ApiProperty({  example: 'Municipio de Prueba', description: 'Nombre del municipio' })
    nombre_mu: string;
    @ApiProperty({  example: true, description: 'Estatus del municipio' })
    status_mu: boolean;
    @ApiProperty({  example: 12345, description: 'Código postal del municipio' })
    cod_postal_mu: number;
    @ApiProperty({  example: 1, description: 'ID del estado al que pertenece el municipio' })
    id_mun_id: number;
  }
  