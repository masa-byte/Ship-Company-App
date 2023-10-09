import { Injectable } from '@nestjs/common';
import { Renting } from './renting.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class RentingService {

    constructor(@InjectRepository(Renting) private rentingRepository: Repository<Renting>) {}

    async create(renting: Renting): Promise<Renting> {
        return await this.rentingRepository.save(renting['renting']);
    }

    async rate(id: number): Promise<Renting> {
        let renting = await this.rentingRepository.findOne({ where: { id } });
        renting.isRated = true;
    
        return await this.rentingRepository.save(renting);
    }

    async findOneById(id: number): Promise<Renting> {
        return await this.rentingRepository.findOne({ where: { id } });
    }

    async findByUserId(userId: number): Promise<Renting[]> {
        const rentings = await this.rentingRepository
            .createQueryBuilder('renting')
            .innerJoinAndSelect('renting.user', 'user')
            .leftJoinAndSelect('renting.boat', 'boat')
            .leftJoinAndSelect('renting.jetSki', 'jetSki')
            .where('user.id = :userId', { userId })
            .getMany();

        return rentings;
    }

    async findAll(): Promise<Renting[]> {
        return await this.rentingRepository.find();
    }

    async update(renting: Renting): Promise<any> {
        return await this.rentingRepository.save(renting);
    }

    async delete(id: number): Promise<any> {
        return await this.rentingRepository.delete(id);
    }
}
