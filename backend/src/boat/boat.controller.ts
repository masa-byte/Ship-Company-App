import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { BoatService } from './boat.service';
import { Boat } from './boat.entity';
import { Role } from '../auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('boat')
export class BoatController {

    constructor(private readonly boatService: BoatService) { }

    @Roles(Role.Company)
    @Post()
    async create(@Body() boat: Boat): Promise<Boat> {
        return await this.boatService.create(boat);
    }

    @Roles(Role.Company, Role.User, Role.Admin)
    @Get()
    async findAll(): Promise<Boat[]> {
        return await this.boatService.findAll();
    }

    @Roles(Role.Company, Role.User, Role.Admin)
    @Get(':id')
    async findOneById(@Param('id') id: number): Promise<Boat> {
        return await this.boatService.findOneById(id);
    }

    @Roles(Role.Company)
    @Put()
    async update(@Body() boat: Boat): Promise<Boat> {
        return await this.boatService.update(boat);
    }

    @Roles(Role.User)
    @Put('rate')
    async rate(@Body() boat: Object): Promise<Boat> {
        return await this.boatService.rate(boat);
    }

    @Roles(Role.Company)
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        return await this.boatService.delete(id);
    }
}
