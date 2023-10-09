import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from 'src/environment/environment';
import { Staff } from './staff.model';

@Injectable({
    providedIn: 'root',
})
export class StaffService {

    constructor(private http: HttpClient) { }

    createStaff(staff: Staff): Observable<HttpResponse<any>> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.post(url + '/staff',
            { staff: staff },
            { headers: headers, observe: 'response' }
        );
    }

    getOneStaff(id: number): Observable<HttpResponse<any>> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get(url + '/staff/' + id, { headers: headers, observe: 'response' });
    }

    getAllStaff(): Observable<HttpResponse<any>> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get(url + '/staff', { headers: headers, observe: 'response' });
    }

    updateStaff(staff: Staff): Observable<HttpResponse<any>> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.put(url + '/staff/',
            { staff: staff },
            { headers: headers, observe: 'response' }
        );
    }

    deleteStaff(id: number): Observable<HttpResponse<any>> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.delete(url + '/staff/' + id, { headers: headers, observe: 'response' });
    }
}