import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Departamento } from './departamento.entity';

@Entity()
export class Cargo {
  @PrimaryGeneratedColumn()
  id_cargo: number;

  @Column({ length: 50 })
  nombre_car: string;

  @Column()
  status_car: boolean;

  @Column({ length: 50 })
  tipo_cargo: string;

  @ManyToOne(() => Departamento, departamento => departamento.cargos)
  @JoinColumn({ name: 'id_carg_id' }) 
  departamento: Departamento;
  @Column()
  id_carg_id: number;
}



