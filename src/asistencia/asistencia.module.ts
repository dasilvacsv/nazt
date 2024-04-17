import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { AsistenciaController } from './asistencia.controller';
import { AsistenciaService } from './asistencia.service';
import { BiometricoService } from '../biometrico/biometrico.service'; 
import { EmpleadoModule } from 'src/empleado/empleado.module';
import { Biometrico } from 'src/biometrico/entitites/biometrico.entity';

@Module({
    imports: [
      EmpleadoModule,
      TypeOrmModule.forFeature([Asistencia, Biometrico])],
    controllers: [AsistenciaController],
    providers: [AsistenciaService, BiometricoService],
})
export class AsistenciaModule {}