import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Role } from 'src/auth/enums/role.enum';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async createUser(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }
    
    async createCompany(user: User): Promise<User> {
        let companyUser = user['company'];
        let usr = new User();
        usr.email = companyUser.email;
        usr.name = companyUser.name;
        usr.surname = companyUser.surname;
        usr.birthDate = companyUser.birthDate;
        usr.address = companyUser.address;
        usr.phone = companyUser.phone;
        usr.type = Role.Company;
        
        await usr.setPassword(companyUser.password);
        return await this.userRepository.save(usr);
    }

    async findOneByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { email } });
        return await this.userRepository.findOne({ where: { email } });
    }

    async findOneById(id: number): Promise<User> {
        return await this.userRepository.findOne({ where: { id } });
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async update(user: User): Promise<User> {
        let usr = user['user'];
        let userToUpdate = await this.userRepository.findOne({ where: { id: usr.id } });

        if (usr.password != undefined) {
            await userToUpdate.setPassword(usr.password);
        }
        userToUpdate.email = usr.email;
        userToUpdate.name = usr.name;
        userToUpdate.surname = usr.surname;
        userToUpdate.address = usr.address;
        userToUpdate.phone = usr.phone;

        return await this.userRepository.save(userToUpdate);
    }

    async delete(id: number): Promise<any> {
        return await this.userRepository.delete(id);
    }

    async checkPassword(id: number, password: string): Promise<boolean> {
        let user = await this.userRepository.findOne({ where: { id: id } });
        return await user.comparePassword(password);
    }
}
