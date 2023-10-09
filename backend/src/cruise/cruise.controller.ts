import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CruiseService } from './cruise.service';
import { Cruise } from './cruise.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('cruise')
export class CruiseController {

    constructor(private readonly cruiseService: CruiseService) { }

    @Roles(Role.Company)
    @Post()
    async create(@Body() cruise: Cruise): Promise<Cruise> {
        return await this.cruiseService.create(cruise);
    }

    @Roles(Role.Company, Role.User, Role.Admin)
    @Get()
    async findAll(): Promise<Cruise[]> {
        return await this.cruiseService.findAll();
    }

    @Roles(Role.Company, Role.User, Role.Admin)
    @Get(':id')
    async findOneById(@Param('id') id: number): Promise<Cruise> {
        return await this.cruiseService.findOneById(id);
    }

    @Roles(Role.Company, Role.User, Role.Admin)
    @Get(':destinationId')
    async findByDestinationId(@Param('destinationId') destinationId: number): Promise<Cruise[]> {
        return await this.cruiseService.findByDestinationId(destinationId);
    }

    @Roles(Role.Company)
    @Put()
    async update(@Body() cruise: Cruise): Promise<Cruise> {
        return await this.cruiseService.update(cruise);
    }

    @Roles(Role.Company)
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        return await this.cruiseService.delete(id);
    }
}
