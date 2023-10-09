import { Module } from '@nestjs/common';
import { JetSki } from './jet-ski.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JetSkiService } from './jet-ski.service';
import { JetSkiController } from './jet-ski.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([JetSki]),
    ],
    providers: [JetSkiService],
    controllers: [JetSkiController],
})
export class JetSkiModule {}
