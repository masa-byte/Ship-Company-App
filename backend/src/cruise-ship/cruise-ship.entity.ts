import { Cruise } from "src/cruise/cruise.entity";
import { Staff } from "src/staff/staff.entity";
import { Suite } from "src/suite/suite.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class CruiseShip {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    yearBuilt: number;

    @Column()
    restaurants: number;

    @Column()
    bars: number;

    @Column()
    pools: number;

    @Column()
    theaters: number;

    @Column()
    gyms: number;

    @Column({ default: 0 })
    gradeSum: number;

    @Column({ default: 0 })
    gradeCount: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0})
    rating: number;

    @OneToMany(() => Suite, suite => suite.cruiseShip,)
    suites: Suite[];

    @OneToMany(() => Cruise, cruise => cruise.cruiseShip,)
    cruises: Cruise[];
}

