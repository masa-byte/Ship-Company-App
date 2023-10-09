import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Renting } from './renting.entity';
import { RentingController } from './renting.controller';
import { RentingService } from './renting.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Renting]),
    ],
    controllers: [RentingController],
    providers: [RentingService],
})
export class RentingModule {}
