import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { SuiteModule } from 'src/suite/suite.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Reservation]),
        SuiteModule
    ],
    providers: [ReservationService],
    controllers: [ReservationController],
})
export class ReservationModule {}
