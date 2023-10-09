import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Roles(Role.Admin)
    @Post()
    async create(@Body() user: User): Promise<User> {
        return await this.userService.createCompany(user);
    }

    @Roles(Role.Admin)
    @Get()
    async findAll(): Promise<User[]> {
        return await this.userService.findAll();
    }

    @Roles(Role.Admin, Role.User, Role.Company)
    @Get(':id')
    async findOneById(@Param('id') id: number): Promise<User> {
        return await this.userService.findOneById(id);
    }

    @Roles(Role.Admin, Role.User, Role.Company)
    @Get(':email')
    async findOneByEmail(@Param('email') email: string): Promise<User> {
        return await this.userService.findOneByEmail(email);
    }

    @Roles(Role.Admin, Role.User, Role.Company)
    @Get(':id/checkpassword/:password')
    async checkPassword(@Param('id') id: number, @Param('password') password: string): Promise<boolean> {
        return await this.userService.checkPassword(id, password);
    }

    @Roles(Role.Admin, Role.User, Role.Company)
    @Put()
    async update(@Body() user: User): Promise<User> {
        return await this.userService.update(user);
    }

    @Roles(Role.Admin, Role.User, Role.Company)
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        return await this.userService.delete(id);
    }
}
