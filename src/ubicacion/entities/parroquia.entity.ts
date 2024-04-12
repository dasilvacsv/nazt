import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Municipio } from './municipio.entity';

@Entity()
export class Parroquia {
    @PrimaryGeneratedColumn()
    id_parroquia: number;

    @Column({ length: 50 })
    nombre_pa: string;

    @Column()
    status_pa: boolean;

    @ManyToOne(() => Municipio, municipio => municipio.parroquias)
    @JoinColumn({ name: 'id_pa_id' })
    municipio: Municipio;
    @Column()
    id_pa_id: number;
}

