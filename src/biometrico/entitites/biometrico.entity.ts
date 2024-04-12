import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('biometrico')
@Unique(['uid'])
export class Biometrico {
    @PrimaryGeneratedColumn('increment', { name: 'id_usuario_b' })
    idUsuarioB: number;

    @Column({ type: 'int', unique: true, name: 'uid' })
    uid: number;

    @Column({ type: 'int', name: 'userid' })
    userId: string;

    @Column({ type: 'varchar', length: 20, name: 'name' })
    name: string;

    @Column({ type: 'varchar', length: 20, nullable: true, name: 'password' })
    password?: string;

    @Column({ type: 'int', nullable: true, name: 'role' })
    role?: number;

    @Column({ type: 'varchar', length: 8, nullable: true, name: 'cardno' })
    cardNo?: string;
}
