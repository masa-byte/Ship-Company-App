import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService) { }

    @Roles(Role.Company, Role.User, Role.Admin)
    @Post()
    async sendEmail(@Body() body: { to: string; subject: string; text: string }) {
        const { to, subject, text } = body;
        await this.emailService.sendEmail(to, subject, text);
        return { message: 'Email sent successfully' };
    }
}
