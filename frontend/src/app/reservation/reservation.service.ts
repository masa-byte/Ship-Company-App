import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from 'src/environment/environment';
import { Reservation } from './reservation.model';

@Injectable({
    providedIn: 'root'
})
export class ReservationService {

    constructor(private http: HttpClient) { }

    createReservation(reservation: Reservation): Observable<HttpResponse<any>> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.post(url + '/reservation',
            { reservation: reservation },
            { headers: headers, observe: 'response' }
        );
    }

    getUserReservations(userId: number): Observable<HttpResponse<any>> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get(url + '/reservation/user/' + userId,
            { headers: headers, observe: 'response' }
        );
    }

    deleteReservation(reservationId: number): Observable<HttpResponse<any>> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.delete(url + '/reservation/' + reservationId,
            { headers: headers, observe: 'response' }
        );
    }

    rateReservation(reservationId: number): Observable<HttpResponse<any>> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.put(url + '/reservation/rate',
            { id: reservationId },
            { headers: headers, observe: 'response' }
        );
    }
}
