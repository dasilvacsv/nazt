import { ApiProperty } from "@nestjs/swagger";

export class CreateEmpleadoDto {
    @ApiProperty({example: '12345678', description: 'Número de cédula del empleado'})
    cedula_e: string;

    @ApiProperty({example: 'Juan', description: 'Primer nombre del empleado'})
    nombre1_e: string;

    @ApiProperty({example: 'Carlos', description: 'Segundo nombre del empleado'})
    nombre2_e: string;

    @ApiProperty({example: 'Pérez', description: 'Primer apellido del empleado'})
    apellido1_e: string;

    @ApiProperty({example: 'González', description: 'Segundo apellido del empleado'})
    apellido2_e: string;

    @ApiProperty({example: '1990-01-01', description: 'Fecha de nacimiento del empleado'})
    fecha_nac_e: Date;

    @ApiProperty({example: 'M', description: 'Sexo del empleado'})
    sexo_e: string;
}
