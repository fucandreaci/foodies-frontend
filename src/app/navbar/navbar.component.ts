import { Component, OnInit } from '@angular/core';
import { Shared } from '../services/shared';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username!: string;

  constructor(private shared: Shared) { }

  ngOnInit(): void {
    this.username = this.shared.actualUser;
  }

  logout(){
    this.shared.logout();
  }

}
