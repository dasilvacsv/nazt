import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Estado } from './estado.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Pais {
  @PrimaryGeneratedColumn('increment')
  id_pais: number;

  @Column({ length: 50 })
  nombre_pais: string;

  @Column()
  status_pais: boolean;

  @OneToMany(() => Estado, estado => estado.id_pais_id)
  estados: Estado[];
}
