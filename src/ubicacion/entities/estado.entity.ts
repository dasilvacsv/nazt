import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Pais } from './pais.entity';
import { Municipio } from './municipio.entity';


@Entity()
export class Estado {
  @PrimaryGeneratedColumn()
  id_estado: number;

  @Column({ length: 50 })
  nombre_es: string;

  @Column()
  status_es: boolean;

  @ManyToOne(() => Pais, pais => pais.estados)
  @JoinColumn({ name: 'id_pais_id' })
  pais: Pais;
  @Column()
  id_pais_id: number;

  @OneToMany(() => Municipio, municipio => municipio.estado)
  municipios: Municipio[];
}
