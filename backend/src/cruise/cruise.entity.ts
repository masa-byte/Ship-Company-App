import { CruiseShip } from "src/cruise-ship/cruise-ship.entity";
import { Destination } from "src/destination/destination.entity";
import { Reservation } from "src/reservation/reservation.entity";
import { Staff } from "src/staff/staff.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany } from "typeorm";

@Entity()
export class Cruise {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    type: string;

    @ManyToMany(() => Staff, staff => staff.cruises,)
    staff: Staff[];

    @ManyToMany(() => Destination, destination => destination.cruises,)
    destinations: Destination[];

    @OneToMany(() => Reservation, reservation => reservation.cruise)
    reservations: Reservation[];

    @ManyToOne(() => CruiseShip, cruiseShip => cruiseShip.cruises)
    cruiseShip: CruiseShip;
}