import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  id_correo?: string;

  @IsOptional()
  @IsNotEmpty()
  @MinLength(6)
  clave_u?: string;
}
