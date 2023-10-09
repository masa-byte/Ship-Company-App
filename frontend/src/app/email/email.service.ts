import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { url } from 'src/environment/environment';
import { Renting } from '../renting/renting.model';
import { Reservation } from '../reservation/reservation.model';
import { Cruise } from '../cruise/cruise.model';

@Injectable({
    providedIn: 'root',
})
export class EmailService {
    constructor(private http: HttpClient) { }

    sendRentingEmail(email: string, renting: Renting): Observable<HttpResponse<any>> {
        const htmlContent = `
        <html>
        <head></head>
        <body>
            <h1><strong> Renting Confirmation <strong></h1>
            <p>For: ${renting.boat == null ? 'jet ski' : 'boat'}</p>
            <p>Type: ${renting.boat == null ? renting.jetSki!.model : renting.boat.type}</p>
            <p>Start date: ${renting.startDate}</p>
            <p>End date: ${renting.endDate}</p>
            <p>Cost: ${renting.cost}</p>
            <p><strong> Have fun! </strong></p>
        </body>
        </html>
        `;
        const subject: string = 'Renting Confirmation';
        return this.sendEmail(email, subject, htmlContent);
    }

    sendReservationEmail(email: string, reservation: Reservation): Observable<HttpResponse<any>> {
        const htmlContent = `
        <html>
        <head></head>
        <body>
            <h1><strong> Reservation Confirmation <strong></h1>
            <p>Cruise: ${reservation.cruise!.name}</p>
            <p>Type: ${reservation.cruise!.type}</p>
            <p>Ship: ${reservation.cruise!.cruiseShip!.name}</p>
            <p>Suite: ${reservation.suite!.type}</p>
            <p>Start date: ${reservation.cruise!.startDate}</p>
            <p>End date: ${reservation.cruise!.endDate}</p>
            <p>Cost: ${reservation.cost}</p>
            <p><strong> Enjoy your trip! </strong></p>
        </body>
        </html>
        `;
        const subject: string = 'Reservation Confirmation';
        return this.sendEmail(email, subject, htmlContent);
    }

    sendStaffCruiseEmail(email: string, cruise: Cruise): Observable<HttpResponse<any>> {
        const htmlContent = `
        <html>
        <head></head>
        <body>
            <h1><strong> New Cruise For You <strong></h1>
            <p>Name: ${cruise.name}</p>
            <p>Type: ${cruise.type}</p>
            <p>Start date: ${cruise.startDate}</p>
            <p>End date: ${cruise.endDate}</p>
            <p><strong> Work hard but don't forget to have fun as well! </strong></p>
        </body>
        </html>
        `;
        const subject: string = 'New Cruise';
        return this.sendEmail(email, subject, htmlContent);
    }

    sendCancellationEmail(email: string): Observable<HttpResponse<any>> {
        const htmlContent = `
        <html>
        <head></head>
        <body>
            <h1><strong> Cancellation Confirmation <strong></h1>
            <p><strong> We are sorry that you cancelled. </strong></p>
        </body>
        </html>
        `;
        const subject: string = 'Cancellation Confirmation';
        return this.sendEmail(email, subject, htmlContent);
    }

    sendWelcomeEmail(userName: string, email: string): Observable<HttpResponse<any>> {
        const htmlContent = `
        <html>
        <head></head>
        <body>
            <h1><strong> Welcome ${userName} to Sail Away! <strong></h1>
            <p><strong> Explore our trips and sail away! </strong></p>
        </body>
        </html>
        `;
        const subject: string = 'Welcome!';
        return this.sendEmail(email, subject, htmlContent);
    }


    private sendEmail(to: string, subject: string, text: string): Observable<HttpResponse<any>> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.post(
            url + '/email',
            {
                to: to,
                subject: subject,
                text: text,
            },
            { headers: headers, observe: 'response' }
        );
    }
}