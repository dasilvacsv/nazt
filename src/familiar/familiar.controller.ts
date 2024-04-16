import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { FamiliarService } from './familiar.service';
import { CreateFamiliarDto } from './dto/create-familiar.dto';
import { UpdateFamiliarDto } from './dto/update-familiar.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CRUD Familiar')
@Controller('familiar')
export class FamiliarController {
  constructor(private readonly familiarService: FamiliarService) {}

  @Post()
  create(@Body() createFamiliarDto: CreateFamiliarDto) {
    return this.familiarService.create(createFamiliarDto);
  }

  @Get()
  findAll() {
    return this.familiarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.familiarService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateFamiliarDto: CreateFamiliarDto) {
    return this.familiarService.update(id, updateFamiliarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.familiarService.remove(id);
  }
}
