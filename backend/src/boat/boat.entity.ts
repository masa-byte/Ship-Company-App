import { Renting } from "src/renting/renting.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

type euro = number;

@Entity()
export class Boat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    yearBuilt: number;

    @Column()
    capacity: number;

    @Column({ default: 0 })
    gradeSum: number;

    @Column({ default: 0 })
    gradeCount: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    rating: number;

    @Column()
    pricePerDay: euro;

    @OneToMany(() => Renting, renting => renting.boat,)
    rentings: Renting[];
}