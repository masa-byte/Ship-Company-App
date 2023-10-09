import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from 'src/environment/environment';
import { Renting } from './renting.model';

@Injectable({
  providedIn: 'root'
})
export class RentingService {

  constructor(private http: HttpClient) { }

  createRenting(renting: Renting): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(url + '/renting',
      { renting: renting },
      { headers: headers, observe: 'response' }
    );
  }

  getUserRentings(userId: number): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(url + '/renting/user/' + userId,
      { headers: headers, observe: 'response' }
    );
  }

  deleteRenting(rentingId: number): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.delete(url + '/renting/' + rentingId,
      { headers: headers, observe: 'response' }
    );
  }

  rateRenting(rentingId: number): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put(url + '/renting/rate',
      { id: rentingId },
      { headers: headers, observe: 'response' }
    );
  }
}
