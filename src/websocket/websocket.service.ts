// src/gateway/websocket.service.ts
import { Injectable } from '@nestjs/common';
import ZKLib from 'zklib-32ble';
import { EventEmitter } from 'events';

@Injectable()
export class ZKTecoService extends EventEmitter {
    private zkInstance: any;

    constructor() {
        super();
        this.zkInstance = new ZKLib('192.168.1.230', 4370, 5200, 5000);
    }

    async initZKConnection(): Promise<void> {
        try {
            await this.zkInstance.createSocket();
            this.zkInstance.getRealTimeLogs((data) => {
                this.emit('realtimeLog', data);
            });

        } catch (error) {
            console.error('Error with ZKTeco device:', error);
            this.zkInstance.disconnect();
        }
    }

    async disconnectZK(): Promise<void> {
        console.log('Disconnecting from ZKTeco device');
        this.zkInstance.disconnect();
    }
}
