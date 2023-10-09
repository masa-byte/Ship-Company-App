import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { StaffService } from './staff.service';
import { Staff } from './staff.entity';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('staff')
export class StaffController {

    constructor(private readonly staffService: StaffService) { }

    @Roles(Role.Admin)
    @Post()
    async create(@Body() staff: Staff): Promise<any> {
        return await this.staffService.create(staff);
    }

    @Roles(Role.Admin, Role.Company)
    @Get()
    async findAll(): Promise<Staff[]> {
        return await this.staffService.findAll();
    }

    @Roles(Role.Admin, Role.Company)
    @Get(':id')
    async findOneById(@Param('id') id: number): Promise<Staff> {
        return await this.staffService.findOneById(id);
    }

    @Roles(Role.Admin, Role.Company)
    @Get(':jobTitle')
    async findOneByJobTitle(@Param('jobTitle') jobTitle: string): Promise<Staff> {
        return await this.staffService.findOneByJobTitle(jobTitle);
    }

    @Roles(Role.Admin)
    @Put()
    async update(@Body() staff: Staff): Promise<any> {
        return await this.staffService.update(staff);
    }

    @Roles(Role.Admin)
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        return await this.staffService.delete(id);
    }
}
