import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utente } from '../models/utente';

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
