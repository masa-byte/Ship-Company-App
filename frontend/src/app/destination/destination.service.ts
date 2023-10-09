import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from 'src/environment/environment';

@Injectable({
    providedIn: 'root'
})
export class DestinationService {
    constructor(private http: HttpClient) { }

    getDestinations(): Observable<HttpResponse<any>> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get(url + '/destination', { headers: headers, observe: 'response' });
    }

    getDestination(id: number): Observable<HttpResponse<any>> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get(url + '/destination/' + id, { headers: headers, observe: 'response' });
    }
}
