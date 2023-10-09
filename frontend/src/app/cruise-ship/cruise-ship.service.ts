import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from 'src/environment/environment';
import { CruiseShip } from './cruise-ship.model';

@Injectable({
  providedIn: 'root'
})
export class CruiseShipService {
  constructor(private http: HttpClient) { }

  createCruiseShip(cruiseShip: CruiseShip): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(url + '/cruise-ship',
      { cruiseShip },
      { headers: headers, observe: 'response' }
    );
  }

  getCruiseShips(): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(url + '/cruise-ship', { headers: headers, observe: 'response' });
  }

  getCruiseShip(id: number): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(url + '/cruise-ship/' + id, { headers: headers, observe: 'response' });
  }

  updateCruiseShip(cruiseShip: CruiseShip): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put(url + '/cruise-ship',
      { cruiseShip },
      { headers: headers, observe: 'response' }
    );
  }

  deleteCruiseShip(id: number): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.delete(url + '/cruise-ship/' + id,
      { headers: headers, observe: 'response' }
    );
  }

  rateCruiseShip(id: number, rating: number): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put(url + '/cruise-ship/rate',
      {
        id: id,
        rating: rating
      },
      { headers: headers, observe: 'response' }
    );
  }
}
