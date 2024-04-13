import { ApiProperty } from "@nestjs/swagger";

export class CreateDepartamentoDto {
  @ApiProperty({ example: 'Departamento de Prueba', description: 'Nombre del departamento' })
  nombre_dep: string;
  @ApiProperty({ example: true, description: 'Estatus del departamento' })
  status_dep: boolean;
}
