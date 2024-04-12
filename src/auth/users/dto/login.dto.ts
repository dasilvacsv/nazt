import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
    @ApiProperty({ example: 'john.doe@example.com', description: 'El correo electrónico del usuario' })
    @IsEmail()
    id_correo: string;
  
    @ApiProperty({ example: 'password', description: 'La contraseña del usuario' })
    @IsNotEmpty()
    clave_u: string;
  }