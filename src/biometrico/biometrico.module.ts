import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BiometricoController } from './biometrico.controller';
import { BiometricoService } from './biometrico.service';
import { Biometrico } from './entitites/biometrico.entity';
import { EmpleadoModule } from '../empleado/empleado.module';
import { AsistenciaService } from 'src/asistencia/asistencia.service';
import { Asistencia } from 'src/asistencia/entities/asistencia.entity';

@Module({
  imports: [
    EmpleadoModule,
    TypeOrmModule.forFeature([Biometrico, Asistencia]), 
  ],
  controllers: [BiometricoController],
  providers: [BiometricoService, AsistenciaService],
  exports: [BiometricoService],
})
export class BiometricoModule {}
