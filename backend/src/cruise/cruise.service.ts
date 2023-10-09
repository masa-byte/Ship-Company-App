import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cruise } from './cruise.entity';

@Injectable()
export class CruiseService {

    constructor(@InjectRepository(Cruise) private cruiseRepository: Repository<Cruise>) {}

    async create(cruise: Cruise): Promise<Cruise> {
        return await this.cruiseRepository.save(cruise['cruise']);
    }

    async findOneById(id: number): Promise<Cruise> {
        return await this.cruiseRepository.findOne({ where: { id } });
    }

    async findByDestinationId(destinationId: number): Promise<Cruise[]> {
        return await this.cruiseRepository.findBy({ destinations: { id: destinationId } });
    }

    async findAll(): Promise<Cruise[]> {
        return await this.cruiseRepository.find({
            relations: ['destinations', 'cruiseShip', 'cruiseShip.suites']});
    }

    async update(cruise: Cruise): Promise<any> {
        return await this.cruiseRepository.save(cruise);
    }

    async delete(id: number): Promise<any> {
        return await this.cruiseRepository.delete(id);
    }
}
