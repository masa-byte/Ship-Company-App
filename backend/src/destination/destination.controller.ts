import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DestinationService } from './destination.service';
import { Destination } from './destination.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('destination')
export class DestinationController {

    constructor(private readonly destinationService: DestinationService) { }

    @Roles(Role.Company)
    @Post()
    async create(@Body() destination: Destination): Promise<any> {
        return await this.destinationService.create(destination);
    }

    @Roles(Role.Company, Role.User, Role.Admin)
    @Get()
    async findAll(): Promise<Destination[]> {
        return await this.destinationService.findAll();
    }

    @Roles(Role.Company, Role.User, Role.Admin)
    @Get(':id')
    async findOneById(@Param('id') id: number): Promise<Destination> {
        return await this.destinationService.findOneById(id);
    }

    @Roles(Role.Company)
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        return await this.destinationService.delete(id);
    }
}
