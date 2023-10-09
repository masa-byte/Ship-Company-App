import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { JetSkiService } from './jet-ski.service';
import { JetSki } from './jet-ski.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('jet-ski')
export class JetSkiController {

    constructor(private readonly jetSkiService: JetSkiService) { }

    @Roles(Role.Company)
    @Post()
    async create(@Body() jetSki: JetSki): Promise<JetSki> {
        return await this.jetSkiService.create(jetSki);
    }

    @Roles(Role.Company, Role.User, Role.Admin)
    @Get()
    async findAll(): Promise<JetSki[]> {
        return await this.jetSkiService.findAll();
    }

    @Roles(Role.Company, Role.User, Role.Admin)
    @Get(':id')
    async findOneById(@Param('id') id: number): Promise<JetSki> {
        return await this.jetSkiService.findOneById(id);
    }

    @Roles(Role.Company)
    @Put()
    async update(@Body() jetSki: JetSki): Promise<JetSki> {
        return await this.jetSkiService.update(jetSki);
    }

    @Roles(Role.User)
    @Put('rate')
    async rate(@Body() jetSki: Object): Promise<JetSki> {
        return await this.jetSkiService.rate(jetSki);
    }

    @Roles(Role.Company)
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        return await this.jetSkiService.delete(id);
    }
}
