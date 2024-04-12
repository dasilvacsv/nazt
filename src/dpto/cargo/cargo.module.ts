import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CargoService } from './cargo.service';
import { CargoController } from './cargo.controller';
import { Cargo } from '../entities/cargo.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Cargo])],
    providers: [CargoService],
    controllers: [CargoController],
    exports: [CargoService], 
})
export class CargoModule {}

