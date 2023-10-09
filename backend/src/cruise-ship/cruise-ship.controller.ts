import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CruiseShipService } from './cruise-ship.service';
import { CruiseShip } from './cruise-ship.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('cruise-ship')
export class CruiseShipController {

    constructor(private readonly cruiseShipService: CruiseShipService) { }

    @Roles(Role.Company)
    @Post()
    async create(@Body() cruiseShip: CruiseShip): Promise<CruiseShip> {
        return await this.cruiseShipService.create(cruiseShip);
    }

    @Roles(Role.Company, Role.User, Role.Admin)
    @Get()
    async findAll(): Promise<CruiseShip[]> {
        return await this.cruiseShipService.findAll();
    }

    @Roles(Role.Company, Role.User, Role.Admin)
    @Get(':id')
    async findOneById(@Param('id') id: number): Promise<CruiseShip> {
        return await this.cruiseShipService.findOneById(id);
    }

    @Roles(Role.Company)
    @Put()
    async update(@Body() cruiseShip: CruiseShip): Promise<CruiseShip> {
        return await this.cruiseShipService.update(cruiseShip);
    }

    @Roles(Role.User)
    @Put('rate')
    async rate(@Body() cruiseShip: Object): Promise<CruiseShip> {
        return await this.cruiseShipService.rate(cruiseShip);
    }

    @Roles(Role.Company)
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        return await this.cruiseShipService.delete(id);
    }
}
