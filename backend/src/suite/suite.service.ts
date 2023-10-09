import { Injectable } from '@nestjs/common';
import { Suite } from './suite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CruiseShipService } from 'src/cruise-ship/cruise-ship.service';

@Injectable()
export class SuiteService {

    constructor(@InjectRepository(Suite) private suiteRepository: Repository<Suite>) { }

    async create(suites: Suite[]): Promise<Suite[]> {
        const suitesToSave = suites['suites'].map((suite: Suite) => {
            return {
                type: suite.type,
                pricePerNight: suite.pricePerNight,
                singleBeds: suite.singleBeds,
                doubleBeds: suite.doubleBeds,
                bathrooms: suite.bathrooms,
                occupied: suite.occupied,
                cruiseShip: suite.cruiseShip
            };
        });

        return await this.suiteRepository.save(suitesToSave);
    }

    async findOneById(id: number): Promise<Suite> {
        return await this.suiteRepository.findOne({ where: { id } });
    }

    async findAll(): Promise<Suite[]> {
        return await this.suiteRepository.find();
    }

    async findAllByCruiseShipId(cruiseShipId: number): Promise<Suite[]> {
        return await this.suiteRepository.findBy({ cruiseShip: { id: cruiseShipId } })
    }

    async update(suites: Suite[]): Promise<any> {
        const suitesToUpdate = suites['suites'].map((suite: Suite) => {
            return {
                id: suite.id,
                type: suite.type,
                pricePerNight: suite.pricePerNight,
                singleBeds: suite.singleBeds,
                doubleBeds: suite.doubleBeds,
                bathrooms: suite.bathrooms,
                occupied: suite.occupied,
                cruiseShip: suite.cruiseShip
            };
        });
        return await this.suiteRepository.save(suitesToUpdate);
    }

    async markAsOccupied(id: number): Promise<any> {
        return await this.suiteRepository.update(id, { occupied: true });
    }

    async delete(id: number): Promise<any> {
        return await this.suiteRepository.delete(id);
    }

    async deleteAll(ids: number[]): Promise<any> {
        return await this.suiteRepository.delete(ids['ids']);
    }
}
