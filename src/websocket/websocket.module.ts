import { Module } from "@nestjs/common";
import { WebsocketGateway } from "./websocket.gateway";
import { ZKTecoService } from "./websocket.service";

@Module({
    providers: [WebsocketGateway, ZKTecoService],
})
export class GatewayModule {}
