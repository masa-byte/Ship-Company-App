import { Module } from '@nestjs/common';
import { Destination } from './destination.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DestinationService } from './destination.service';
import { DestinationController } from './destination.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Destination]),
    ],
    providers: [DestinationService],
    controllers: [DestinationController],
})
export class DestinationModule {}
