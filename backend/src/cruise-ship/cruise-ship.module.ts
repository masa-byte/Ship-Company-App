import { Module } from '@nestjs/common';
import { CruiseShip } from './cruise-ship.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CruiseShipController } from './cruise-ship.controller';
import { CruiseShipService } from './cruise-ship.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([CruiseShip]),
    ],
    controllers: [CruiseShipController],
    providers: [CruiseShipService],
})
export class CruiseShipModule {}
