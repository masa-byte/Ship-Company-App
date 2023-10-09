import { Module } from '@nestjs/common';
import { Suite } from './suite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuiteService } from './suite.service';
import { SuiteController } from './suite.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Suite]),
    ],
    providers: [SuiteService],
    controllers: [SuiteController],
    exports: [SuiteService]
})
export class SuiteModule {}
