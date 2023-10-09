import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Renting } from "src/renting/renting.entity";
import { Reservation } from "src/reservation/reservation.entity";
import { Role } from "src/auth/enums/role.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    surname: string;

    @Column({ nullable: true })
    birthDate: Date;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    phone: string;

    @Column()
    address: string;

    @Column({
        type: "enum",
        enum: Role,
        default: [Role.User]
    })
    type: Role;

    @OneToMany(() => Renting, renting => renting.user,)
    rentings: Renting[];

    @OneToMany(() => Reservation, reservation => reservation.user,)
    reservations: Reservation[];

    async setPassword(password: string): Promise<void> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        this.password = hashedPassword;
    }

    async comparePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}