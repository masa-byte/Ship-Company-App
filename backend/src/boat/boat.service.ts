import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Boat } from './boat.entity';

@Injectable()
export class BoatService {

    constructor(@InjectRepository(Boat) private boatRepository: Repository<Boat>) {}

    async create(boat: Boat): Promise<Boat> {
        return await this.boatRepository.save(boat['boat']);
    }

    async findOneById(id: number): Promise<Boat> {
        return await this.boatRepository.findOne({ where: { id } });
    }

    async findAll(): Promise<Boat[]> {
        return await this.boatRepository.find();
    }

    async update(boat: Boat): Promise<Boat> {
        let b = boat['boat'];
        let boatToUpdate = await this.boatRepository.findOne({ where: { id: b.id } });

        boatToUpdate.name = b.name;
        boatToUpdate.capacity = b.capacity;
        boatToUpdate.pricePerDay = b.pricePerDay;
        boatToUpdate.yearBuilt = b.yearBuilt;
        boatToUpdate.type = b.type;

        return await this.boatRepository.save(boatToUpdate);
    }

    async delete(id: number): Promise<any> {
        return await this.boatRepository.delete(id);
    }

    async rate(boat: Object): Promise<Boat> {
        let id = boat['id'];
        let rating = boat['rating'];
        let boatToUpdate = await this.boatRepository.findOne({ where: { id: id } });

        boatToUpdate.gradeSum += rating;
        boatToUpdate.gradeCount += 1;
        boatToUpdate.rating = boatToUpdate.gradeSum / boatToUpdate.gradeCount;

        return await this.boatRepository.save(boatToUpdate);
    }
}
