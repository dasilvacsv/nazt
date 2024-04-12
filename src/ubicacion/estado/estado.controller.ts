import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EstadoService } from './estado.service';
import { CreateEstadoDto } from './dto/create-estado.dto';

@Controller('ubicacion/estado')
export class EstadoController {
    constructor(private readonly estadoService: EstadoService) { }

    @Post()
    create(@Body() createEstadoDto: CreateEstadoDto) {
        return this.estadoService.create(createEstadoDto);
    }

    @Get()
    findAll() {
        return this.estadoService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.estadoService.findOne(id);
    }

    @Get('/by-pais/:paisId')
    findByPaisId(@Param('paisId') paisId: number) {
        return this.estadoService.findByPaisId(paisId);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateEstadoDto: CreateEstadoDto) {
        return this.estadoService.update(id, updateEstadoDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.estadoService.remove(id);
    }
}
