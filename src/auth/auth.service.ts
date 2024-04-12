// src/auth/auth.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.getUserByEmailForAuth(email);

    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    const isPasswordMatching = await bcrypt.compare(pass, user.clave_u);
    if (!isPasswordMatching) {
      throw new HttpException('Contraseña incorrecta', HttpStatus.FORBIDDEN);
    }

    const payload = { email: user.id_correo, sub: user.id_usuario };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
