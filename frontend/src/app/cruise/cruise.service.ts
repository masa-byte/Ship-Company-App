import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from 'src/environment/environment';
import { Cruise } from './cruise.model';

@Injectable({
    providedIn: 'root'
})
export class CruiseService {
    constructor(private http: HttpClient) { }

    createCruise(cruise: Cruise): Observable<HttpResponse<any>> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.post(url + '/cruise',
            { cruise: cruise },
            { headers: headers, observe: 'response' }
        );
    }

    getCruisees(): Observable<HttpResponse<any>> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get(url + '/cruise', { headers: headers, observe: 'response' });
    }

    getCruise(id: number): Observable<HttpResponse<any>> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get(url + '/cruise/' + id, { headers: headers, observe: 'response' });
    }

    deleteCruise(id: number): Observable<HttpResponse<any>> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.delete(url + '/cruise/' + id,
            { headers: headers, observe: 'response' }
        );
    }
}
