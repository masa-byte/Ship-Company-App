import { Boat } from "src/boat/boat.entity";
import { JetSki } from "src/jet-ski/jet-ski.entity";
import { User } from "src/user/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Renting {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    cost: number;

    @Column()
    isRated: boolean;

    @ManyToOne(() => User, user => user.rentings, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => JetSki, jetSki => jetSki.rentings, { onDelete: 'CASCADE' })
    jetSki: JetSki;

    @ManyToOne(() => Boat, boat => boat.rentings, { onDelete: 'CASCADE' })
    boat: Boat;
}