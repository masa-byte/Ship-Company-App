import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from 'src/environment/environment';
import { Boat } from './boat.model';

@Injectable({
  providedIn: 'root'
})
export class BoatService {
  constructor(private http: HttpClient) { }

  createBoat(boat: Boat): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(url + '/boat',
      { boat: boat },
      { headers: headers, observe: 'response' }
    );
  }

  getBoates(): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(url + '/boat', { headers: headers, observe: 'response' });
  }

  getBoat(id: number): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(url + '/boat/' + id, { headers: headers, observe: 'response' });
  }

  updateBoat(boat: Boat): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put(url + '/boat',
      { boat: boat },
      { headers: headers, observe: 'response' }
    );
  }

  deleteBoat(id: number): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.delete(url + '/boat/' + id,
      { headers: headers, observe: 'response' }
    );
  }

  rateBoat(id: number, rating: number): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put(url + '/boat/rate',
      {
        id: id,
        rating: rating
      },
      { headers: headers, observe: 'response' }
    );
  }
}
