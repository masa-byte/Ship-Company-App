import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from './staff.entity';

@Injectable()
export class StaffService {

    constructor(@InjectRepository(Staff) private staffRepository: Repository<Staff>) {}

    async create(staff: Staff): Promise<Staff> {
        return await this.staffRepository.save(staff['staff']);
    }

    async findOneById(id: number): Promise<Staff> {
        return await this.staffRepository.findOne({ where: { id } });
    }

    async findOneByJobTitle(jobTitle: string): Promise<Staff> {
        return await this.staffRepository.findOne({ where: { jobTitle } });
    }

    async findAll(): Promise<Staff[]> {
        return await this.staffRepository.find();
    }

    async update(staff: Staff): Promise<any> {
        let stf = staff['staff'];
        let staffToUpdate = await this.staffRepository.findOne({ where: { id: stf.id } });

        staffToUpdate.name = stf.name;
        staffToUpdate.surname = stf.surname;
        staffToUpdate.email = stf.email;
        staffToUpdate.address = stf.address;
        staffToUpdate.jobTitle = stf.jobTitle;
        staffToUpdate.salary = stf.salary;
        staffToUpdate.yearsOfExperience = stf.yearsOfExperience;

        return await this.staffRepository.save(staffToUpdate);
    }

    async delete(id: number): Promise<any> {
        return await this.staffRepository.delete(id);
    }
}
