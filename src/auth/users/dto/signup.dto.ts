import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignUpDto {
  @IsEmail({}, { message: 'El correo electrónico es incorrecto' })
  id_correo: string;

  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(6)
  clave_u: string;

  @IsNotEmpty({ message: 'Debe especificar el usuario a registrar' })
  id_empleado_id: number;
}
