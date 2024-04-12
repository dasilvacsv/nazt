import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cargo } from '../entities/cargo.entity';
import { CreateCargoDto } from './dto/create-cargo.dto';


@Injectable()
export class CargoService {
    constructor(
    @InjectRepository(Cargo)
    private cargoRepository: Repository<Cargo>,
    ) { }
    
    async create(createCargoDto: CreateCargoDto): Promise<Cargo> {
        const newCargo = this.cargoRepository.create(createCargoDto);
        return this.cargoRepository.save(newCargo);
    }

    async findAll(): Promise<Cargo[]> {
        return this.cargoRepository.find();
    }

    async findOne(id: number): Promise<Cargo> {
        return this.cargoRepository.findOne({ where: { id_cargos: id } });
    }

    async findByDepartamentoId(departamentoId: number): Promise<Cargo[]> {
        return this.cargoRepository.find({
          where: { id_carg_id: departamentoId }
        });
    }

    async update(id: number, updateCargoDto: CreateCargoDto): Promise<Cargo> {
        await this.cargoRepository.update(id, updateCargoDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.cargoRepository.delete(id);
    }
}


