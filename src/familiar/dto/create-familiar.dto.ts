import { ApiProperty } from "@nestjs/swagger";

export class CreateFamiliarDto {
    @ApiProperty({example: 'Familiar de Prueba', description: 'Nombre del familiar'})
    nombre_f: string;

    @ApiProperty({example: 'Apellido 1', description: 'Apellido 1'} )
    apellido1_f: string;

    @ApiProperty({example: 'Apellido 2', description: 'Apellido 2'} )
    apellido2_f: string;

    @ApiProperty({example: 'Cedula', description: 'Cedula'} )
    cedula_f: string;

    @ApiProperty({example: '1990-01-01', description: 'Fecha de nacimiento del familiar'})
    fecha_nac_f: Date;

    @ApiProperty({example: 'M', description: 'Sexo del familiar'})
    sexo_f: string;

    @ApiProperty({example: true, description: 'Estatus del familiar'})
    status_f: boolean;
    
    @ApiProperty({example: 'Madre', description: 'Vinculo del familiar'})
    vinculo_f: string;

    @ApiProperty({example: 1, description: 'ID del empleado referido'})
    id_fam_id: number;
  }

