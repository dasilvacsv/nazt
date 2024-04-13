import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Estado } from './estado.entity';
import { Parroquia } from './parroquia.entity';


@Entity()
export class Municipio {
  @PrimaryGeneratedColumn()
  id_municipio: number;

  @Column({ length: 50 })
  nombre_mu: string;

  @Column()
  status_mu: boolean;

  @Column()
  cod_postal_mu: number;

  @ManyToOne(() => Estado, estado => estado.municipios)
  @JoinColumn({ name: 'id_mun_id' })
  estado: Estado;
  @Column()
  id_mun_id: number;

  @OneToMany(() => Parroquia, parroquia => parroquia.municipio)
  parroquias: Parroquia[];
}
