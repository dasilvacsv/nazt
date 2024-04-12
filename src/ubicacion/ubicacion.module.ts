import { Module } from '@nestjs/common';
import { PaisModule } from './pais/pais.module';
import { EstadoModule } from './estado/estado.module';
import { MunicipioModule } from './municipio/municipio.module';
import { ParroquiaModule } from './parroquia/parroquia.module';

@Module({
  imports: [PaisModule, EstadoModule, MunicipioModule, ParroquiaModule],
})
export class UbicacionModule {}
