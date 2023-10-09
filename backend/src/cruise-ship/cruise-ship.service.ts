import { Injectable } from '@nestjs/common';
import { CruiseShip } from './cruise-ship.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CruiseShipService {

    constructor(@InjectRepository(CruiseShip) private cruiseShipRepository: Repository<CruiseShip>) {}

    async create(cruiseShip: CruiseShip): Promise<CruiseShip> {
        return await this.cruiseShipRepository.save(cruiseShip['cruiseShip']);
    }

    async findOneById(id: number): Promise<CruiseShip> {
        return await this.cruiseShipRepository.findOne({ where: { id } });
    }

    async findAll(): Promise<CruiseShip[]> {
        return await this.cruiseShipRepository.find();
    }

    async update(cruiseShip: CruiseShip): Promise<CruiseShip> {
        let cs = cruiseShip['cruiseShip'];
        let cruiseShipToUpdate = await this.cruiseShipRepository.findOne({ where: { id: cs.id } });

        cruiseShipToUpdate.name = cs.name;
        cruiseShipToUpdate.bars = cs.bars;
        cruiseShipToUpdate.gyms = cs.gyms;
        cruiseShipToUpdate.pools = cs.pools;
        cruiseShipToUpdate.restaurants = cs.restaurants;
        cruiseShipToUpdate.theaters = cs.theaters;
        cruiseShipToUpdate.yearBuilt = cs.yearBuilt;

        return await this.cruiseShipRepository.save(cruiseShipToUpdate);
    }

    async rate(cruiseShip: Object): Promise<CruiseShip> {
        let id = cruiseShip['id'];
        let rating = cruiseShip['rating'];
        let cruiseShipToUpdate = await this.cruiseShipRepository.findOne({ where: { id: id } });

        cruiseShipToUpdate.gradeSum += rating;
        cruiseShipToUpdate.gradeCount += 1;
        cruiseShipToUpdate.rating = cruiseShipToUpdate.gradeSum / cruiseShipToUpdate.gradeCount;

        return await this.cruiseShipRepository.save(cruiseShipToUpdate);
    }

    async delete(id: number): Promise<any> {
        return await this.cruiseShipRepository.delete(id);
    }
}
