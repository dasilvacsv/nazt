import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Parroquia } from '../ubicacion/entities/parroquia.entity';
import { Cargo } from '../dpto/entities/cargo.entity';
import { Usuario } from 'src/auth/entities/usuario.entity';

@Entity()
export class Empleado {
    // Datos primordiales
    @PrimaryGeneratedColumn()
    id_empleado: number;

    @Column({ unique: true })
    cedula_e: string;

    @Column()
    nombre1_e: string;

    @Column()
    nombre2_e: string;

    @Column()
    apellido1_e: string;

    @Column()
    apellido2_e: string;

    @Column({ type: 'date' })
    fecha_nac_e: Date;

    @Column()
    sexo_e: string;

    // Datos Contacto
    @Column({ nullable: true })
    telef_fijo_e: string | null;

    @Column({ nullable: true })
    telef_movil_e: string | null;

    @Column({ nullable: true })
    correo_e: string | null;

    @Column({ nullable: true })
    id_parr_id: number | null;

    @Column({ nullable: true })
    direccion_e: string | null;

    // Datos Uniformes
    @Column({ nullable: true })
    pantalon_e: string | null;

    @Column({ nullable: true })
    camisa_e: string | null;

    @Column({ nullable: true })
    botas_e: string | null;

    // Datos de Trabajo
    @Column({ nullable: true })
    id_emp_carg: number | null;

    @Column({ nullable: true })
    tipo_personal_e: string | null;

    @Column({ nullable: true })
    jornada_e: string | null;

    // Datos Caracteristicos
    @Column({ nullable: true })
    geo_ubicacion: string | null;

    @Column({ nullable: true })
    reg_fotog_e: string | null;

    @Column({ nullable: true })
    reg_biometrico_e: number | null;

    @ManyToOne(() => Parroquia)
    @JoinColumn({ name: 'id_parr_id' })
    parroquia: Parroquia;

    @ManyToOne(() => Cargo)
    @JoinColumn({ name: 'id_emp_carg' })
    cargo: Cargo;

    @OneToOne(() => Usuario, usuario => usuario.empleado)
    usuario: Usuario;
}
