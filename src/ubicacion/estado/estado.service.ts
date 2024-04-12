import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estado } from '../entities/estado.entity';
import { CreateEstadoDto } from './dto/create-estado.dto';


@Injectable()
export class EstadoService {
    constructor(
    @InjectRepository(Estado)
    private estadoRepository: Repository<Estado>,
    ) { }

    async create(createEstadoDto: CreateEstadoDto): Promise<Estado> {
        const newEstado = this.estadoRepository.create(createEstadoDto);
        return this.estadoRepository.save(newEstado);
    }

    async findAll(): Promise<Estado[]> {
        return this.estadoRepository.find();
    }

    async findOne(id: number): Promise<Estado> {
        return this.estadoRepository.findOne({ where: { id_estado: id } });
    }
    
     async findByPaisId(paisId: number): Promise<Estado[]> {
    return this.estadoRepository.find({
      where: { id_pais_id: paisId }
    });
    }

    async update(id: number, updateEstadoDto: CreateEstadoDto): Promise<Estado> {
        await this.estadoRepository.update(id, updateEstadoDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.estadoRepository.delete(id);
    }
    
}


