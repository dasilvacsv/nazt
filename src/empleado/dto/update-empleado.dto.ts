import { PartialType } from '@nestjs/mapped-types';
import { CreateEmpleadoDto } from './create-empleado.dto';

export class UpdateEmpleadoDto extends PartialType(CreateEmpleadoDto) {
    telef_fijo_e?: string;
    telef_movil_e?: string;
    correo_e?: string;
    id_parroquia_id?: number;
    direccion_e?: string;
    pantalon_e?: string;
    camisa_e?: string;
    botas_e?: string;
    id_cargo_id?: number;
    tipo_per_e?: string;
    jornada_e?: string;
    geo_ubicacion?: string;
    reg_fotog_e?: string;
    reg_biometrico_e?: number;
}


