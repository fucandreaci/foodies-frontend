import { EventEmitter, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Post } from "../models/post";
import { Utente } from "../models/utente";

@Injectable({
  providedIn: 'root'
})

export class Shared{

  constructor(private route: Router){}

  actualUser!: string;

  actualEditPost!: Post;

  logout(){
    localStorage.clear();
    this.route.navigate(['/login']);
  }
}
