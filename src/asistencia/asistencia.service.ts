import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual } from 'typeorm';
import { Asistencia } from './entities/asistencia.entity';

@Injectable()
export class AsistenciaService {
    constructor(
        @InjectRepository(Asistencia)
        private asistenciaRepository: Repository<Asistencia>
    ) {}

    async getAllAsistencias(): Promise<Asistencia[]> {
        return await this.asistenciaRepository.find({
            where: { id_asis_id: LessThanOrEqual(500) }
        });
    }

    async addOrUpdateAsistencia(data: any): Promise<string> {
        const { userSn, recordTime } = data;
        const uid = parseInt(userSn, 10);

        if (uid > 500) {
            return 'UID exceeds maximum allowed value.';
        }

        const recordDate = new Date(recordTime);
        
        const dateOnly = new Date(recordDate.toISOString().split('T')[0]);

        const timeOnly = recordDate.toTimeString().split(' ')[0];

        const existingEntry = await this.asistenciaRepository.findOne({
            where: {
                id_asis_id: uid,
                fecha_entrada: dateOnly,
            },
        });

        if (existingEntry) {
            if (!existingEntry.fecha_salida) {
                existingEntry.fecha_salida = dateOnly;
                existingEntry.hora_salida = timeOnly;
                await this.asistenciaRepository.save(existingEntry);
                return 'Updated existing attendance with exit time.';
            } else {
                return 'Attendance already fully recorded.';
            }
        } else {
            const newAsistencia = this.asistenciaRepository.create({
                id_asis_id: uid,
                fecha_entrada: dateOnly,
                hora_entrada: timeOnly,
                status_a: true,
            });
            await this.asistenciaRepository.save(newAsistencia);
            return 'New attendance entry created.';
        }
    }
}
