import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {

    constructor(private mailerService: MailerService) { }

    async sendEmail(to: string, subject: string, text: string) {
        try {
            await this.mailerService.sendMail({
                from: 'sailaway.app.system@gmail.com',
                to : to,
                subject : subject,
                text : text,
                html: `${text}</br>
                <p>Sail Away Team</p></br>`
            });
        } catch (error) {
            console.log(error);
        }
    }
}
