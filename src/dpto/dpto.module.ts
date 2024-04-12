import { Module } from '@nestjs/common';
import { DepartamentoModule } from './departamento/departamento.module';
import { CargoModule } from './cargo/cargo.module';

@Module({
  imports: [DepartamentoModule, CargoModule]
})
export class DptoModule {}
