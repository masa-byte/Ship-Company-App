import { HttpClient,  HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from 'src/environment/environment';
import { Suite } from './suite.model';

@Injectable({
    providedIn: 'root'
})
export class SuiteService {

    constructor(private http: HttpClient) { }

    createSuites(suites: Suite[]): Observable<HttpResponse<any>> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.post(url + '/suite',
            { suites: suites },
            { headers: headers, observe: 'response' }
        );
    }

    getCruiseShipSuites(cruiseShipId: number): Observable<HttpResponse<any>> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get(url + '/suite/cruise-ship/' + cruiseShipId,
            { headers: headers, observe: 'response' }
        );
    }

    updateSuites(suites: Suite[]): Observable<HttpResponse<any>> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.put(url + '/suite',
            { suites: suites },
            { headers: headers, observe: 'response' }
        );
    }

    deleteSuites(suitesIds: number[]): Observable<HttpResponse<any>> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.delete(url + '/suite',
            { body: { ids: suitesIds }, observe: 'response' }
        );
    }
}