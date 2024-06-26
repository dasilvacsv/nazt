// src/ubicacion/municipio.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MunicipioService } from './municipio.service';
import { MunicipioController } from './municipio.controller';
import { Municipio } from '../entities/municipio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Municipio])],
  providers: [MunicipioService],
  controllers: [MunicipioController],
})
export class MunicipioModule {}
