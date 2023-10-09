import { Injectable } from '@nestjs/common';
import { Destination } from './destination.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DestinationService {

    constructor(@InjectRepository(Destination) private destinationRepository: Repository<Destination>) {}

    async create(destination: Destination): Promise<Destination> {
        return await this.destinationRepository.save(destination);
    }

    async findOneById(id: number): Promise<Destination> {
        return await this.destinationRepository.findOne({ where: { id } });
    }

    async findAll(): Promise<Destination[]> {
        return await this.destinationRepository.find();
    }

    async delete(id: number): Promise<any> {
        return await this.destinationRepository.delete(id);
    }
}
