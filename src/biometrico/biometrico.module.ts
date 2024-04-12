import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BiometricoController } from './biometrico.controller';
import { BiometricoService } from './biometrico.service';
import { Biometrico } from './entitites/biometrico.entity';
import { EmpleadoModule } from '../empleado/empleado.module';

@Module({
  imports: [
    EmpleadoModule,
    TypeOrmModule.forFeature([Biometrico]), 
  ],
  controllers: [BiometricoController],
  providers: [BiometricoService],
})
export class BiometricoModule {}
