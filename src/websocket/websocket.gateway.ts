// src/gateway/websocket.gateway.ts
import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ZKTecoService } from './websocket.service';

@WebSocketGateway()
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private zktecoService: ZKTecoService) {
    zktecoService.on('realtimeLog', (data) => {
      this.server.emit('realtimeLog', data);
      console.log(data);
      
    });
  }

  handleConnection(client: Socket): void {
    console.log(`Client connected: ${client.id}`);
    this.zktecoService.initZKConnection();
  }

  handleDisconnect(client: Socket): void {
    console.log(`Client disconnected: ${client.id}`);
    this.zktecoService.disconnectZK();
  }
}
