import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { Utente } from '../models/utente';
import { Shared } from './shared';
import { UtenteService } from './utente.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private utenteService: UtenteService, private route: Router,
    private shared: Shared) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    var user = new Utente();
    user.username = localStorage.getItem('username')!;
    user.password = localStorage.getItem('password')!;

    if(this.userValid(user)){
      // IMPOSTO L'USERNAME PER LA NAVBAR
      this.shared.actualUser = user.username;
      return true;
    } else{
      this.route.navigate(['/']);
      return false;
    }
  }

  public userValid(user: Utente): boolean{
    if(user.username === "" || user.username == null
    || user.password === "" || user.password == null){
      return false;
    } else{
      return true;
    }
  }
}
