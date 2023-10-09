import { Injectable } from '@nestjs/common';
import { Reservation } from './reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuiteService } from 'src/suite/suite.service';

@Injectable()
export class ReservationService {

    constructor(@InjectRepository(Reservation) private reservationRepository: Repository<Reservation>, private suiteService: SuiteService) {}

    async create(reservation: Reservation): Promise<Reservation> {
        await this.suiteService.markAsOccupied(reservation.suite.id);
        return await this.reservationRepository.save(reservation['reservation']);
    }

    async findOneById(id: number): Promise<Reservation> {
        return await this.reservationRepository.findOne({ where: { id } });
    }

    async findByUserId(userId: number): Promise<Reservation[]> {
        const reservations = await this.reservationRepository
            .createQueryBuilder('reservation')
            .innerJoinAndSelect('reservation.user', 'user')
            .leftJoinAndSelect('reservation.suite', 'suite')
            .leftJoinAndSelect('reservation.cruise', 'cruise')
            .leftJoinAndSelect('cruise.cruiseShip', 'cruiseShip')
            .where('user.id = :userId', { userId })
            .getMany();

        return reservations;
    }

    async findAll(): Promise<Reservation[]> {
        return await this.reservationRepository.find();
    }

    async update(reservation: Reservation): Promise<any> {
        return await this.reservationRepository.save(reservation);
    }

    async rate(id: number): Promise<Reservation> {
        let reservation = await this.reservationRepository.findOne({ where: { id } });
        reservation.isRated = true;

        return await this.reservationRepository.save(reservation);
    }

    async delete(id: number): Promise<any> {
        return await this.reservationRepository.delete(id);
    }
}
