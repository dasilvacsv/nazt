import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
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

  @OneToOne(() => Empleado)
  @JoinColumn({ name: 'id_empleado_id' })
  empleado: Empleado;

  @Column({ type: 'timestamp' })
  create_u?: Date;

  @Column({ type: 'timestamp' })
  update_u?: Date;
  
  constructor(partial: Partial<Usuario>) {
    Object.assign(this, partial);
  }
}
