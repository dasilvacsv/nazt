import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CRUD Empleado')
@Controller('/empleado')
export class EmpleadoController {
    constructor(private readonly empleadoService: EmpleadoService) { }

    @Post()
    create(@Body() createEmpleadoDto: CreateEmpleadoDto) {
        return this.empleadoService.create(createEmpleadoDto);
    }

    @Get('/basic-data')
    findAllBasicData() {
        return this.empleadoService.findAllBasicData();

    }

    @Get('/cantbiometrico')
    countBiometricRegistered() {
        return this.empleadoService.empleadosBiometrico();
    }

    @Get('/cedula/:cedula')
    findByCedula(@Param('cedula') cedula: string) {
        return this.empleadoService.findByCedula(cedula);
    }


    @Get()
    findAll() {
        return this.empleadoService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.empleadoService.findOne(id);
    }

    

    @Put(':id')
    update(@Param('id') id: number, @Body() updateEmpleadoDto: CreateEmpleadoDto) {
        return this.empleadoService.update(id, updateEmpleadoDto);
    }

    @Patch(':id')
    patch(@Param('id') id: number, @Body() updates: any) {
        return this.empleadoService.patch(id, updates);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.empleadoService.remove(id);
    }



}
