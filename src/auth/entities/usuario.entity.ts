import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Empleado } from '../../empleado/empleado.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ length: 100 })
  id_correo: string;

  @Exclude()
  @Column({ length: 100 })
  clave_u: string;

  @Column()
  id_us_id: number;

  @OneToOne(() => Empleado)
  @JoinColumn({ name: 'id_us_id' })  
  empleado: Empleado;

  constructor(partial: Partial<Usuario>) {
    Object.assign(this, partial);
  }
}
