import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SuiteService } from './suite.service';
import { Suite } from './suite.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('suite')
export class SuiteController {

    constructor(private readonly suiteService: SuiteService) { }

    @Roles(Role.Company)
    @Post()
    async create(@Body() suites: Suite[]): Promise<Suite[]> {
        return await this.suiteService.create(suites);
    }

    @Roles(Role.Company, Role.User)
    @Get()
    async findAll(): Promise<Suite[]> {
        return await this.suiteService.findAll();
    }

    @Roles(Role.Company, Role.User)
    @Get(':id')
    async findOneById(@Param('id') id: number): Promise<Suite> {
        return await this.suiteService.findOneById(id);
    }

    @Roles(Role.Company, Role.User)
    @Get('cruise-ship/:id')
    async findAllByCruiseShipId(@Param('id') id: number): Promise<Suite[]> {
        return await this.suiteService.findAllByCruiseShipId(id);
    }

    @Roles(Role.Company)
    @Put()
    async update(@Body() suites: Suite[]): Promise<any> {
        return await this.suiteService.update(suites);
    }

    @Roles(Role.Company)
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        return await this.suiteService.delete(id);
    }

    @Roles(Role.Company)
    @Delete()
    async deleteAll(@Body() ids: number[]): Promise<any> {
        return await this.suiteService.deleteAll(ids);
    }
}
