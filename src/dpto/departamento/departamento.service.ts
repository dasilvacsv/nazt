import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Departamento} from '../entities/departamento.entity';
import {CreateDepartamentoDto} from './dto/create-departamento.dto';

@Injectable()
export class DepartamentoService {
    constructor(
        @InjectRepository(Departamento)
        private departamentoRepository: Repository<Departamento>,
    ) { }
    
    async create(createDepartamentoDto: CreateDepartamentoDto): Promise<Departamento> {
        const newDepartamento = this.departamentoRepository.create(createDepartamentoDto);
        return this.departamentoRepository.save(newDepartamento);
    }
    
    async findAll(): Promise<Departamento[]> {
        return this.departamentoRepository.find();
    }

    async findOne(id: number): Promise<Departamento> {
        return this.departamentoRepository.findOne({ where: { id_departamento: id } });
        
    }

    async update(id: number, updateDepartamentoDto: CreateDepartamentoDto): Promise<Departamento> {
        await this.departamentoRepository.update(id, updateDepartamentoDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.departamentoRepository.delete(id);
    }
}

