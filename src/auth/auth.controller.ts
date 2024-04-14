// src/auth/auth.controller.ts
import { Body, Controller, Post, UseGuards, Get, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto } from './users/dto/login.dto';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('acceso')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto.id_correo, loginDto.clave_u);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('perfil')
  getProfile(@Request() req) {
    return req.user;
  }
}
