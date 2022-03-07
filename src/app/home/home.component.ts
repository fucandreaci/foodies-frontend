import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../models/post';
import { Utente } from '../models/utente';
import { PostService } from '../services/post.service';
import { Shared } from '../services/shared';
import { UtenteService } from '../services/utente.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  admin: boolean = false;
  filtro: boolean = false;

  errorMsg!: string;

  posts: Post[] = [];

  filtroTitolo: string = "";
  filtroDescrizione: string = "";

  daDate!: string;
  aDate!: string;

  constructor(private route: Router, private utenteService: UtenteService,
    private postService: PostService, private shared: Shared) { }

  ngOnInit(): void {
    this.getPosts();

    if(localStorage.getItem('username') == "admin" && localStorage.getItem('password') == "1234"){
      this.admin = true;
    }
  }

  logout(){
    this.shared.logout();
  }

  getPosts(){
    var user = new Utente();
    user.username = localStorage.getItem('username')!;
    user.password = localStorage.getItem('password')!;
    this.postService.getPosts(user).subscribe(
      (response: any) => {
        this.posts = response.reverse();
      },
      (error: HttpErrorResponse) => {
        console.log(error.error)
      }
    )

    this.filtro = false;
    this.errorMsg = "";
  }

  updatePosts(){

    var user = new Utente();
    user.username = localStorage.getItem('username')!;
    user.password = localStorage.getItem('password')!;
    this.postService.getPosts(user).subscribe(
      (response: any) => {
        var filteredPosts: Post[] = response;
        for(let i = 0; i < filteredPosts.length; i++){
          for(let j = 0; j < this.posts.length; j++){
            if(filteredPosts[i].id == this.posts[j].id){
              this.posts.splice(j, 1);
              this.posts.push(filteredPosts[i]);
            }
          }
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error.error)
      }
    )
  }

  addLike(idPost: number){
    var user = new Utente();
    user.username = localStorage.getItem('username')!;
    user.password = localStorage.getItem('password')!;

    this.postService.like(user, idPost).subscribe(
      (response: any) => {
        if(this.filtroDescrizione == ""
          && this.filtroTitolo == ""){
          this.getPosts();
        }else{
          this.updatePosts();
        }
      },
      (error: HttpErrorResponse) => {
        let findedPost = this.posts.find(item => item.id == idPost)
        findedPost!.errore = error.error

        this.removePostsError(findedPost!);
      }
    );
  }

  addUnLike(idPost: number){
    var user = new Utente();
    user.username = (localStorage.getItem('username')!);
    user.password = (localStorage.getItem('password')!);

    this.postService.unlike(user, idPost).subscribe(
      (response: any) => {
        if(this.filtroDescrizione == ""
        && this.filtroTitolo == ""){
        this.getPosts();
      }else{
        this.updatePosts();
      }
      },
      (error: HttpErrorResponse) => {
        let findedPost = this.posts.find(item => item.id == idPost)
        findedPost!.errore = error.error

        this.removePostsError(findedPost!);
      }
    );
  }

  unliked(idPost: number): boolean{
    let findedPost = this.posts.find(item => item.id == idPost)

    let findedUser = findedPost?.unlikes.find(user => user.username == localStorage.getItem('username')
    && user.password == localStorage.getItem('password'));

    return findedUser != undefined;
  }

  removePostsError(findedPost: Post){
    this.posts.forEach(item => {
      if (item.id != findedPost!.id) {
        item.errore = ""
      }
    })
  }

  liked(idPost: number): boolean{
    let findedPost = this.posts.find(item => item.id == idPost)

    let findedUser = findedPost?.likes.find(user => user.username == localStorage.getItem('username')
    && user.password == localStorage.getItem('password'));

    return findedUser != undefined;
  }

  getPostByFiltro(){
    this.filtro = true;
    this.errorMsg = "";
    var user = new Utente();
    user.username = (localStorage.getItem('username')!);
    user.password = (localStorage.getItem('password')!);

    var filteredPost = new Post();

    if(this.filtroTitolo != null && this.filtroTitolo !== undefined)
      filteredPost.titolo = this.filtroTitolo;
    else
      filteredPost.titolo = "";

    if(this.filtroDescrizione != null && this.filtroDescrizione !== undefined)
      filteredPost.descrizione = this.filtroDescrizione;
    else
      filteredPost.descrizione = "";

    this.postService.getPostByFiltro(filteredPost, user).subscribe(
      (response: any) => {
        console.log(response)
        this.posts = response;
      },
      (error: HttpErrorResponse) => {
        this.posts = [];
        this.errorMsg = "Nessun post trovato."
      }
    )
  }

  filtraDateDaA(){
    this.filtro = true;
    this.errorMsg = "";
    var user = new Utente();
    user.username = (localStorage.getItem('username')!);
    user.password = (localStorage.getItem('password')!);


    console.log(this.daDate + ":00")
    console.log(this.aDate + ":00")
    this.postService.getLastUpdateBetween(user, this.daDate + ":00", this.aDate + ":00").subscribe(
      (response: any) => {
        this.posts = response;
      },
      (error: HttpErrorResponse) => {
        this.posts = [];
      }
    )
  }


  deletePost(idPost: number){
    this.postService.deletePost(idPost).subscribe(
      (response) => {
        this.getPosts();
      },
      (error :HttpErrorResponse) => {
        console.log(error)
      }
    )
  }
}
