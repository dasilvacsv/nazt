import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parroquia } from '../entities/parroquia.entity';
import { CreateParroquiaDto } from './dto/create-parroquia.dto';

@Injectable()
export class ParroquiaService {
    constructor(
        @InjectRepository(Parroquia)
        private parroquiaRepository: Repository<Parroquia>,
    ) {}

    async create(createParroquiaDto: CreateParroquiaDto): Promise<Parroquia> {
        const newParroquia = this.parroquiaRepository.create(createParroquiaDto);
        return this.parroquiaRepository.save(newParroquia);
    }

    async findAll(): Promise<Parroquia[]> {
        return this.parroquiaRepository.find();
    }

    async findOne(id: number): Promise<Parroquia> {
        return this.parroquiaRepository.findOne({ where: { id_parroquia: id } });
    }

    async findByMunicipioId(municipioId: number): Promise<Parroquia[]> {
        return this.parroquiaRepository.find({
            where: { id_pa_id: municipioId }
        });
    }

    async update(id: number, updateParroquiaDto: CreateParroquiaDto): Promise<Parroquia> {
        await this.parroquiaRepository.update(id, updateParroquiaDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.parroquiaRepository.delete(id);
    }
}