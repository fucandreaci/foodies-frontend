import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { Utente } from '../models/utente/utente';
import { UtenteService } from './utente.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private utenteService: UtenteService, private route: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    var user = new Utente();
    user.setUsername(localStorage.getItem('username')!);
    user.setPassword(localStorage.getItem('password')!);

    console.log(this.userValid(user))
    if(this.userValid(user)){
      return true;
    } else{
      this.route.navigate(['/']);
      return false;
    }
  }

  public userValid(user: Utente): boolean{
    if(user.getUsername() === "" || user.getUsername() == null
    || user.getPassword() === "" || user.getPassword() == null){
      console.log(user.getUsername())
      console.log(user.getPassword())
      return false;
    } else{
      return true;
    }
  }
}
