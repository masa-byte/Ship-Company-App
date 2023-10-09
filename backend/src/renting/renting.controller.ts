import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RentingService } from './renting.service';
import { Renting } from './renting.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('renting')
export class RentingController {

    constructor(private readonly rentingService: RentingService) { }

    @Roles(Role.User)
    @Post()
    async create(@Body() renting: Renting): Promise<any> {
        return await this.rentingService.create(renting);
    }
    
    @Roles(Role.User)
    @Get()
    async findAll(): Promise<Renting[]> {
        return await this.rentingService.findAll();
    }
    
    @Roles(Role.User)
    @Get(':id')
    async findOneById(@Param('id') id: number): Promise<Renting> {
        return await this.rentingService.findOneById(id);
    }
    
    @Roles(Role.User)
    @Get('/user/:userId')
    async findByUserId(@Param('userId') userId: number): Promise<Renting[]> {
        return await this.rentingService.findByUserId(userId);
    }
    
    @Roles(Role.User)
    @Put()
    async update(@Body() renting: Renting): Promise<any> {
        return await this.rentingService.update(renting);
    }
    
    @Roles(Role.User)
    @Put('rate')
    async rate(@Body() id: Object): Promise<Renting> {
        return await this.rentingService.rate(parseInt(id['id']));
    }
    
    @Roles(Role.User)
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        return await this.rentingService.delete(id);
    }
}
