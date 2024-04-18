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
            return 'UID no válido.';
        }

        const recordDate = new Date(recordTime);
        const dateOnly = new Date(recordDate.toISOString().split('T')[0]);
        const timeOnly = recordDate.toTimeString().split(' ')[0];

        const existingEntries = await this.asistenciaRepository.find({
            where: {
                id_asis_id: uid,
                fecha_entrada: dateOnly
            },
            order: {
                hora_entrada: 'ASC'
            }
        });

        if (existingEntries.length > 0) {
            const latestEntry = existingEntries[existingEntries.length - 1];
            const lastEntryTime = new Date(`${dateOnly.toISOString().split('T')[0]}T${latestEntry.hora_entrada}`);

            const msDifference = recordDate.getTime() - lastEntryTime.getTime();
            const hoursDifference = msDifference / 1000 / 60 / 60;

            if (hoursDifference <= 1 && !latestEntry.hora_salida) {
                latestEntry.hora_salida = timeOnly;
                await this.asistenciaRepository.save(latestEntry);
                return 'El registro de asistencia fue modificado con la hora de salida.';
            } else if (hoursDifference > 1) {
                const newAsistencia = this.asistenciaRepository.create({
                    id_asis_id: uid,
                    fecha_entrada: dateOnly,
                    hora_entrada: timeOnly,
                    status_a: true,
                });
                await this.asistenciaRepository.save(newAsistencia);
                return 'Nueva entrada de asistencia creada para una hora diferente.';
            }
        } else {
            const newAsistencia = this.asistenciaRepository.create({
                id_asis_id: uid,
                fecha_entrada: dateOnly,
                hora_entrada: timeOnly,
                status_a: true,
            });
            await this.asistenciaRepository.save(newAsistencia);
            return 'Nueva asistencia para el día creada.';
        }
        return 'Asistencia ya registrada completamente o condiciones no cumplidas para nueva entrada.';
    }
}
