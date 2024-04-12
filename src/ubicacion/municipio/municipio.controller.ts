// src/ubicacion/municipio.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { MunicipioService } from './municipio.service';
import { CreateMunicipioDto } from './dto/create-municipio.dto';

@Controller('ubicacion/municipio')
export class MunicipioController {
  constructor(private readonly municipioService: MunicipioService) {}

  @Post()
  create(@Body() createMunicipioDto: CreateMunicipioDto) {
    return this.municipioService.create(createMunicipioDto);
  }

    @Get()
    findAll() {
        return this.municipioService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.municipioService.findOne(id);
    }

    @Get('/by-estado/:estadoId')
    findByEstadoId(@Param('estadoId') estadoId: number) {
        return this.municipioService.findByEstadoId(estadoId);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateMunicipioDto: CreateMunicipioDto) {
        return this.municipioService.update(id, updateMunicipioDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.municipioService.remove(id);
    }

}

