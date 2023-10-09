import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { Reservation } from './reservation.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('reservation')
export class ReservationController {

    constructor(private readonly reservationService: ReservationService) { }

    @Roles(Role.User)
    @Post()
    async create(@Body() reservation: Reservation): Promise<Reservation> {
        return await this.reservationService.create(reservation);
    }

    @Roles(Role.User)
    @Get()
    async findAll(): Promise<Reservation[]> {
        return await this.reservationService.findAll();
    }

    @Roles(Role.User)
    @Get(':id')
    async findOneById(@Param('id') id: number): Promise<Reservation> {      
        return await this.reservationService.findOneById(id);
    }

    @Roles(Role.User)
    @Get('/user/:userId')
    async findByUserId(@Param('userId') userId: number): Promise<Reservation[]> {
        return await this.reservationService.findByUserId(userId);
    }

    @Roles(Role.User)
    @Put()
    async update(@Body() reservation: Reservation): Promise<Reservation> {
        return await this.reservationService.update(reservation);
    }

    @Roles(Role.User)
    @Put('rate')
    async rate(@Body() id: Object): Promise<Reservation> {
        return await this.reservationService.rate(parseInt(id['id']));
    }

    @Roles(Role.User)
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        return await this.reservationService.delete(id);
    }
}
