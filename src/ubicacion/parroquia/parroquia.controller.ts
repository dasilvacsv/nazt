import {Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ParroquiaService } from './parroquia.service';
import { CreateParroquiaDto } from './dto/create-parroquia.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("CRUD Parroquia")
@Controller('ubicacion/parroquia')
export class ParroquiaController {
    constructor(private readonly parroquiaService: ParroquiaService) {}

    @Post()
    create(@Body() createParroquiaDto: CreateParroquiaDto) {
        return this.parroquiaService.create(createParroquiaDto);
    }

    @Get()
    findAll() {
        return this.parroquiaService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.parroquiaService.findOne(id);
    }

    @Get('/by-municipio/:municipioId')
    findByMunicipioId(@Param('municipioId') municipioId: number) {
        return this.parroquiaService.findByMunicipioId(municipioId);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateParroquiaDto: CreateParroquiaDto) {
        return this.parroquiaService.update(id, updateParroquiaDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.parroquiaService.remove(id);
    }


}

