import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpleadoService } from './empleado.service';
import { EmpleadoController } from './empleado.controller';
import { Empleado } from './empleado.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Empleado])],
  providers: [EmpleadoService],
  controllers: [EmpleadoController],
  exports: [EmpleadoService]
})
export class EmpleadoModule {}


