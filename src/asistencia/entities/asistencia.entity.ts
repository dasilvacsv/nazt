import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Empleado } from 'src/empleado/empleado.entity';

@Entity('asistencia')
export class Asistencia {
    @PrimaryGeneratedColumn()
    id_asistencia: number;

    @Column({ type: 'date', nullable: true })
    fecha_entrada: Date;

    @Column({ type: 'time', nullable: true })
    hora_entrada: string;

    @Column({ type: 'boolean', nullable: true })
    status_a: boolean;

    @Column({ type: 'date', nullable: true })
    fecha_salida: Date;

    @Column({ type: 'time', nullable: true })
    hora_salida: string;

    @Column({ length: 25, nullable: true })
    observacion_a: string;

    @Column()
    id_asis_id: number;

    @ManyToOne(() => Empleado)
    @JoinColumn({ name: 'id_asis_id' })
    empleado: Empleado;
}
