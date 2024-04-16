import { Injectable } from '@nestjs/common';
import { CreateFamiliarDto } from './dto/create-familiar.dto';
import { UpdateFamiliarDto } from './dto/update-familiar.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Familiar } from './entities/familiar.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FamiliarService {
  constructor(
    @InjectRepository(Familiar)
    private familiarRepository: Repository<Familiar>,
  ){ }

  async create(createFamiliarDto: CreateFamiliarDto): Promise<Familiar>{
    const newFamiliar = this.familiarRepository.create(createFamiliarDto);
    return this.familiarRepository.save(newFamiliar);
  }

  async findAll(): Promise<Familiar[]>{
    return this.familiarRepository.find();
  }

  async findOne(id: number): Promise<Familiar>{
    return this.familiarRepository.findOne({ where: { id_familiar: id} });
  }

  async findByFamiliarId(familiarId :number): Promise<Familiar[]>{
    return this.familiarRepository.find({
      where: { id_familiar: familiarId}
    });
  }

  async update(id: number, updateFamiliarDto: CreateFamiliarDto): Promise<Familiar>{
    await this.familiarRepository.update(id, updateFamiliarDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void>{
    await this.familiarRepository.delete(id);
  }
}
