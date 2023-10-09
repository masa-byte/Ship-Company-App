import { Module } from '@nestjs/common';
import { Staff } from './staff.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Staff]),
    ],
    providers: [StaffService],
    controllers: [StaffController],
})
export class StaffModule {}
