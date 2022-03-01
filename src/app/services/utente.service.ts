import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utente } from '../models/utente/utente';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  login(user: Utente): Observable<any>{
    return this.http.post<any>(`${this.apiServerUrl}/utenti/postLogin`, user)
  }

  signup(user: Utente): Observable<any>{
    return this.http.post<any>(`${this.apiServerUrl}/utenti/postRegistrazione`, user)
  }

  getPosts(user: Utente): Observable<any>{
    // return this.http.get<any>(`${this.apiServerUrl}/posts/getAll` + JSON.stringify(user))
    // let httpHeaders = new HttpHeaders()
    //   .set('Accept', 'application/json');
    // let httpParams = new HttpParams()
    //   .set('username', user.getUsername())
    //   .set('password', user.getPassword());
    // return this.http.get<any>(`${this.apiServerUrl}/posts/getAll`, {
    //   headers: httpHeaders,
    //   params: httpParams,
    //   responseType: 'json'
    // });
    return this.http.get<any>(`${this.apiServerUrl}/posts/getAll/`, {headers:
      {
        username: localStorage.getItem("username") + "",
        password: localStorage.getItem("password") + "",
        'Content-Type': 'application/json; charset=utf-8'
      }
     })
  }

  // addPersone(p: Persona): Observable<any>{
  //   return this.http.post<any>(`${this.apiServerUrl}/persona/add`, p)
  // }

  // updatePersone(p: Persona): Observable<any>{
  //   return this.http.put<any>(`${this.apiServerUrl}/persona/update`, p)
  // }

  // deletePersone(idPersona: number): Observable<any>{
  //   return this.http.delete<any>(`${this.apiServerUrl}/persona/delete/${idPersona}`)
  // }

  // loginPersona(p: Persona): Observable<any>{
  //   return this.http.post<any>(`${this.apiServerUrl}/postLogin`, p)
  // }

  // signupPersona(p: Persona): Observable<any>{
  //   return this.http.post<any>(`${this.apiServerUrl}/postSignup`, p)
  // }

  // verifyPersona(token: string): Observable<any>{
  //   return this.http.post<any>(`${this.apiServerUrl}/verifyToken`, token)
  // }
}
