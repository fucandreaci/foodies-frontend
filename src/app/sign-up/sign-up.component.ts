import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Utente } from '../models/utente';
import { UtenteService } from '../services/utente.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  errorMsg: string = "";

  constructor(private utenteService: UtenteService, private router: Router) { }

  ngOnInit(): void {
  }

  onSignupSubmit(form: NgForm){
    var newUser = new Utente(form.value);

    this.utenteService.signup(newUser).subscribe(
      (response: any) => {
        this.router.navigate(['/login']);
      },
      (error: HttpErrorResponse) => {
        this.errorMsg = error.error;
      }
    )
  }

}
