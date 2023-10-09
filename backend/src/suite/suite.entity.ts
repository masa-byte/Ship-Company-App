import { CruiseShip } from "src/cruise-ship/cruise-ship.entity";
import { Reservation } from "src/reservation/reservation.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm";

@Entity()
export class Suite {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    pricePerNight: number;

    @Column()
    singleBeds: number;

    @Column()
    doubleBeds: number;

    @Column()
    bathrooms: number;

    @Column({ default: false })
    occupied: boolean;

    @ManyToOne(() => CruiseShip, cruiseShip => cruiseShip.suites, { onDelete: 'CASCADE' })
    cruiseShip: CruiseShip;

    @OneToOne(() => Reservation, reservation => reservation.suite)
    reservation: Reservation;
}

