import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({ example: 'test@gmail.com', description: 'El correo electrónico del usuario' })
  @IsEmail({}, { message: 'El correo electrónico es incorrecto' })
  id_correo: string;

  @ApiProperty({ example: 'password', description: 'La contraseña del usuario' })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(6)
  clave_u: string;

  @ApiProperty({ example: 1, description: 'El id del empleado a registrar' })
  @IsNotEmpty({ message: 'Debe especificar el usuario a registrar' })
  id_empleado_id: number;
}
