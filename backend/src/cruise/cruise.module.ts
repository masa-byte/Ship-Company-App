import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cruise } from './cruise.entity';
import { CruiseController } from './cruise.controller';
import { CruiseService } from './cruise.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Cruise]),
    ],
    controllers: [CruiseController],
    providers: [CruiseService],
})
export class CruiseModule {}
