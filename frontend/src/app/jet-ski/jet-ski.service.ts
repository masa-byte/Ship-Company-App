import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JetSki } from './jet-ski.model';
import { Observable } from 'rxjs';
import { url } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class JetSkiService {

  constructor(private http: HttpClient) { }

  createJetSki(jetSki: JetSki): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(url + '/jet-ski',
      { jetSki: jetSki },
      { headers: headers, observe: 'response' }
    );
  }

  getJetSkies(): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(url + '/jet-ski', { headers: headers, observe: 'response' });
  }

  getJetSki(id: number): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(url + '/jet-ski/' + id, { headers: headers, observe: 'response' });
  }

  updateJetSki(jetSki: JetSki): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put(url + '/jet-ski',
      { jetSki: jetSki },
      { headers: headers, observe: 'response' }
    );
  }

  deleteJetSki(id: number): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.delete(url + '/jet-ski/' + id,
      { headers: headers, observe: 'response' }
    );
  }

  rateJetSki(id: number, rating: number): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put(url + '/jet-ski/rate',
      {
        id: id,
        rating: rating
      },
      { headers: headers, observe: 'response' }
    );
  }
}
