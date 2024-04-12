import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Municipio } from '../entities/municipio.entity';
import { CreateMunicipioDto } from './dto/create-municipio.dto';

@Injectable()
export class MunicipioService {
  constructor(
    @InjectRepository(Municipio)
    private municipioRepository: Repository<Municipio>,
  ) {}

  async create(createMunicipioDto: CreateMunicipioDto): Promise<Municipio> {
    const newMunicipio = this.municipioRepository.create(createMunicipioDto);
    return this.municipioRepository.save(newMunicipio);
  }

    async findAll(): Promise<Municipio[]> {
        return this.municipioRepository.find();
    }

    async findOne(id: number): Promise<Municipio> {
        return this.municipioRepository.findOne({ where: { id_municipio: id } });
    }

    async findByEstadoId(estadoId: number): Promise<Municipio[]> {
    return this.municipioRepository.find({
      where: { id_mun_id: estadoId }
    });
    }

    async update(id: number, updateMunicipioDto: CreateMunicipioDto): Promise<Municipio> {
        await this.municipioRepository.update(id, updateMunicipioDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.municipioRepository.delete(id);
    }


}


