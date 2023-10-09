import { Cruise } from "src/cruise/cruise.entity";
import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany } from "typeorm";

@Entity()
export class Destination {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    city: string;

    @Column()
    country: string;

    @Column()
    description: string;

    @ManyToMany(() => Cruise, cruise => cruise.destinations)
    @JoinTable()
    cruises: Cruise;
}