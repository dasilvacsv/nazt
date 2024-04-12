import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {Cargo} from './cargo.entity';

@Entity()
export class Departamento {
  @PrimaryGeneratedColumn()
  id_departamento: number;

  @Column({ length: 35 })
  nombre_dep: string;

  @Column()
  status_dep: boolean;

  @OneToMany(() => Cargo, cargo => cargo.id_departamento_id)
  cargos: Cargo[];
}






