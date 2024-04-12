import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuario.entity'; 

@Entity('sesion') 
export class Sesion {
  @PrimaryGeneratedColumn()
  id_sesion: number;

  @Column({ type: 'date' })
  fecha_s: Date;

  @Column({ type: 'time' })
  hora_s: string;

  @Column({ length: 50 })
  ip_s: string;

  @Column({ type: 'timestamp without time zone', default: () => 'CURRENT_TIMESTAMP' })
  create_s: Date;

  @Column({ type: 'timestamp without time zone', default: () => 'CURRENT_TIMESTAMP' })
  update_s: Date;

  @ManyToOne(() => Usuario, usuario => usuario.id_usuario) 
  @JoinColumn({ name: 'id_usuario_id' })
  usuario: Usuario;
}
