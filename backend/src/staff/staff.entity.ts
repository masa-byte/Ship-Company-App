import { Cruise } from "src/cruise/cruise.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, ManyToMany } from "typeorm";

@Entity()
export class Staff {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    email: string;

    @Column()
    address: string;

    @Column()
    birthDate: Date;

    @Column()
    jobTitle: string;

    @Column()
    salary: number;

    @Column()
    yearsOfExperience: number;

    @ManyToMany(() => Cruise, cruise => cruise.staff)
    @JoinTable()
    cruises: Cruise[];
}