import { Module } from '@nestjs/common';
import { Boat } from './boat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoatController } from './boat.controller';
import { BoatService } from './boat.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Boat]),
    ],
    controllers: [BoatController],
    providers: [BoatService],
})
export class BoatModule {}
