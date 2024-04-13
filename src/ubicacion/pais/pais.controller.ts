import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PaisService } from './pais.service';
import { CreatePaisDto } from './pais/dto/create-pais.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiBody } from '@nestjs/swagger';

@ApiTags('CRUD País')
@Controller('ubicacion/pais')
export class PaisController {
  constructor(private readonly paisService: PaisService) {}

  @Post()
  @ApiBody({ type: CreatePaisDto })
  create(@Body() createPaisDto: CreatePaisDto) {
    return this.paisService.create(createPaisDto);
  }

  @Get()
  findAll() {
    return this.paisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.paisService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updatePaisDto: CreatePaisDto) {
    return this.paisService.update(id, updatePaisDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.paisService.remove(id);
  }
}
