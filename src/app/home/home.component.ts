import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utente } from '../models/utente/utente';
import { UtenteService } from '../services/utente.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: Router, private utenteService: UtenteService) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.clear();
    this.route.navigate(['/']);
  }

  getPosts(){
    var user = new Utente();
    user.setUsername(localStorage.getItem('username')!);
    user.setPassword(localStorage.getItem('password')!);
    this.utenteService.getPosts(user).subscribe(
      (response: any) => {
        console.log(response)
      },
      (error: HttpErrorResponse) => {
        console.log(error.error)
      }
    )
  }

}
