import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pais } from '../entities/pais.entity';
import { CreatePaisDto } from './pais/dto/create-pais.dto';


@Injectable()
export class PaisService {
  constructor(
    @InjectRepository(Pais)
    private paisRepository: Repository<Pais>,
  ) { }

  async create(createPaisDto: CreatePaisDto): Promise<Pais> {
    const newPais = this.paisRepository.create(createPaisDto);
    return this.paisRepository.save(newPais);
  }

  async findAll(): Promise<Pais[]> {
    return this.paisRepository.find();
  }


  async findOne(id: number): Promise<Pais> {
    return this.paisRepository.findOne({ where: { id_pais: id } });
  }


  async update(id: number, updatePaisDto: CreatePaisDto): Promise<Pais> {
    await this.paisRepository.update(id, updatePaisDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.paisRepository.delete(id);
  }
}
