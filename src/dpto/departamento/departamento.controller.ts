import {Controller, Get, Post, Body, Param, Put, Delete} from '@nestjs/common';
import {DepartamentoService} from './departamento.service';
import {CreateDepartamentoDto} from './dto/create-departamento.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CRUD Departamento')
@Controller('dpto/departamento')
export class DepartamentoController {
    constructor(private readonly departamentoService: DepartamentoService) {}
    
    @Post()
    create(@Body() createDepartamentoDto: CreateDepartamentoDto) {
        return this.departamentoService.create(createDepartamentoDto);
    }
    
    @Get()
    findAll() {
        return this.departamentoService.findAll();
    }
    
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.departamentoService.findOne(id);
    }
    
    @Put(':id')
    update(@Param('id') id: number, @Body() updateDepartamentoDto: CreateDepartamentoDto) {
        return this.departamentoService.update(id, updateDepartamentoDto);
    }
    
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.departamentoService.remove(id);
    }
}

