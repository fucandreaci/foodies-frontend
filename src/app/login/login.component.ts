import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Utente } from '../models/utente/utente';
import { UtenteService } from '../services/utente.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private utenteService: UtenteService, private router: Router) { }

  errorMsg: string = "";

  ngOnInit(): void {
  }

  onLoginSubmit(form: NgForm){
    var newUser = new Utente(form.value);

    this.utenteService.login(newUser).subscribe(
      (response: any) => {
        this.router.navigate(['/home']);
        localStorage.setItem('username', newUser.getUsername());
        localStorage.setItem('password', newUser.getPassword());
      },
      (error: HttpErrorResponse) => {
        this.errorMsg = error.error;
      }
    )
  }

}
