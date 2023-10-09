import { Cruise } from "src/cruise/cruise.entity";
import { Suite } from "src/suite/suite.entity";
import { User } from "src/user/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    perosnalChef: boolean;

    @Column()
    bodyguard: boolean;

    @Column()
    tourGuide: boolean;

    @Column()
    cost: number;

    @Column()
    isRated: boolean;

    @ManyToOne(() => User, user => user.reservations, { onDelete: 'CASCADE' })
    user: User;

    @OneToOne(() => Suite, suite => suite.reservation)
    @JoinColumn()
    suite: Suite;

    @ManyToOne(() => Cruise, cruise => cruise.reservations, { onDelete: 'CASCADE' })
    cruise: Cruise;
}