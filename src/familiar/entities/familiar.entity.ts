import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Empleado } from 'src/empleado/empleado.entity';

@Entity()
export class Familiar {
    @PrimaryGeneratedColumn()
    id_familiar: number;

    @Column({ length: 50 })
    nombre_f: string;

    @Column({ length: 50 })
    apellido1_f: string;

    @Column({ length: 50 })
    apellido2_f: string;

    @Column({ length: 12 })
    cedula_f: string;

    @Column({ type: 'date' })
    fecha_nac_f: Date;

    @Column()
    sexo_f: string;

    @Column()
    status_f: boolean;

    @Column({ length: 15 })
    vinculo_f: string;

    // @ManyToOne(() => Empleado, empleado => empleado.familiar)
    // @JoinColumn({ name: 'id_fam_id' })
    // empleado: Empleado;
    // @Column()
    // id_fam_id: number;
}
