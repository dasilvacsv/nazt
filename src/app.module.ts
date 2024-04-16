import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/logger.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UbicacionModule } from './ubicacion/ubicacion.module';
import { DptoModule } from './dpto/dpto.module';
import { EmpleadoModule } from './empleado/empleado.module';
import { BiometricoModule } from './biometrico/biometrico.module';
import { GatewayModule } from './websocket/websocket.module';
import { AuthModule } from './auth/auth.module';
import { ExcelModule } from './excel/excel.module';
import { FamiliarModule } from './familiar/familiar.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true,}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('PG_HOST'),
        port: config.get('PG_PORT'),
        username: config.get('PG_USER'),
        password: config.get('PG_PASSWORD'),
        database: config.get('PG_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, // Note: solo para desarrollo
      }),
      inject: [ConfigService],
    }),
    UbicacionModule,
    DptoModule,
    EmpleadoModule,
    BiometricoModule,
    GatewayModule,
    AuthModule,
    ExcelModule,
    FamiliarModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
