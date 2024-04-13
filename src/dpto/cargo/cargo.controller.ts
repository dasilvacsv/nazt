import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CargoService } from './cargo.service';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CRUD Cargo')
@Controller('dpto/cargo')
export class CargoController {
    constructor(private readonly cargoService: CargoService) { }

    @Post()
    create(@Body() createCargoDto: CreateCargoDto) {
        return this.cargoService.create(createCargoDto);
    }

    @Get()
    findAll() {
        return this.cargoService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.cargoService.findOne(id);
    }

    @Get('/by-departamento/:departamentoId')
    findByDepartamentoId(@Param('departamentoId') departamentoId: number) {
        return this.cargoService.findByDepartamentoId(departamentoId);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateCargoDto: CreateCargoDto) {
        return this.cargoService.update(id, updateCargoDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.cargoService.remove(id);
    }
}

