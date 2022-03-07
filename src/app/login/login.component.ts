import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Utente } from '../models/utente';
import { Shared } from '../services/shared';
import { UtenteService } from '../services/utente.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private utenteService: UtenteService, private router: Router,
      private shared: Shared) { }

  errorMsg: string = "";

  ngOnInit(): void {
  }

  onLoginSubmit(form: NgForm){
    var newUser = new Utente(form.value);

    this.utenteService.login(newUser).subscribe(
      (response: any) => {
        this.router.navigate(['/home']);
        localStorage.setItem('username', newUser.username);
        localStorage.setItem('password', newUser.password);
      },
      (error: HttpErrorResponse) => {
        this.errorMsg = error.error;
      }
    )
  }

}
