import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cargo } from './cargo.entity';

@Entity()
export class Departamento {
  @PrimaryGeneratedColumn()
  id_departamento: number;

  @Column({ length: 100 }) // Updated length to match your CREATE TABLE
  nombre_dep: string;

  @Column()
  status_dep: boolean;

  @OneToMany(() => Cargo, cargo => cargo.departamento)
  cargos: Cargo[];
}
