import { Injectable } from '@nestjs/common';
import { JetSki } from './jet-ski.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class JetSkiService {

    constructor(@InjectRepository(JetSki) private jetSkiRepository: Repository<JetSki>) {}

    async create(jetSki: JetSki): Promise<JetSki> {
        return await this.jetSkiRepository.save(jetSki['jetSki']);
    }

    async findOneById(id: number): Promise<JetSki> {
        return await this.jetSkiRepository.findOne({ where: { id } });
    }

    async findAll(): Promise<JetSki[]> {
        return await this.jetSkiRepository.find();
    }

    async update(jetSki: JetSki): Promise<JetSki> {
        let jski = jetSki['jetSki'];
        let jetSkiToUpdate = await this.jetSkiRepository.findOne({ where: { id: jski.id } });

        jetSkiToUpdate.model = jski.model;
        jetSkiToUpdate.color = jski.color;
        jetSkiToUpdate.maxSpeed = jski.maxSpeed;
        jetSkiToUpdate.pricePerDay = jski.pricePerDay;

        return await this.jetSkiRepository.save(jetSkiToUpdate);
    }

    async delete(id: number): Promise<any> {
        return await this.jetSkiRepository.delete(id);
    }

    async rate(jetSki: Object): Promise<JetSki> {
        let id = jetSki['id'];
        let rating = jetSki['rating'];
        let jetSkiToUpdate = await this.jetSkiRepository.findOne({ where: { id: id } });

        jetSkiToUpdate.gradeSum += rating;
        jetSkiToUpdate.gradeCount += 1;
        jetSkiToUpdate.rating = jetSkiToUpdate.gradeSum / jetSkiToUpdate.gradeCount;

        return await this.jetSkiRepository.save(jetSkiToUpdate);
    }
}
