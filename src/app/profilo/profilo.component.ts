import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteModalComponent } from '../modals/delete-modal/delete-modal.component';
import { Post } from '../models/post';
import { Utente } from '../models/utente';
import { PostService } from '../services/post.service';
import { Shared } from '../services/shared';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.css']
})
export class ProfiloComponent implements OnInit {

  filtro: boolean = false;
  errorMsg!: string;

  filtroTitolo: string = "";
  filtroDescrizione: string = "";

  daDate!: string;
  aDate!: string;

  posts: Post[] = [];

  constructor(private postService: PostService, private router: Router,
      private shared: Shared, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.getPosts();
  }


  getPosts(){
    var user = new Utente();
    user.username = (localStorage.getItem('username')!);
    user.password = (localStorage.getItem('password')!);
    this.postService.getPostsByUser(user).subscribe(
      (response: any) => {
        this.posts = response.reverse();
      },
      (error: HttpErrorResponse) => {
        console.log(error.error)
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

  // editPost(idPost: number){
  //   let findedPost = this.posts.find(item => item.id == idPost)

  //   this.postService.updatePost(findedPost!).subscribe(
  //     (response) => {
  //       this.getPosts();
  //     },
  //     (error :HttpErrorResponse) => {
  //       console.log(error)
  //     }
  //   )
  // }
  editPost(idPost: number){
    let findedPost = this.posts.find(item => item.id == idPost)
    this.shared.actualEditPost = findedPost!;
    this.router.navigate(['/edit_post']);
  }

  getPostByFiltro(){
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

    this.postService.getPostByFiltroProprietario(filteredPost, user).subscribe(
      (response: any) => {
        console.log(response)
        this.posts = response;
      },
      (error: HttpErrorResponse) => {
        this.posts = [];
      }
    )
  }

  filtraDateDaA(){
    this.errorMsg = "";
    var user = new Utente();
    user.username = (localStorage.getItem('username')!);
    user.password = (localStorage.getItem('password')!);


    console.log(this.daDate + ":00")
    console.log(this.aDate + ":00")
    this.postService.getLastUpdateBetweenProprietario(user, this.daDate + ":00", this.aDate + ":00").subscribe(
      (response: any) => {
        this.posts = response;
      },
      (error: HttpErrorResponse) => {
        this.posts = [];
      }
    )
  }

  deleteConfirm(idPost: number){
    let finestraDialogo = this.matDialog.open(DeleteModalComponent);

    finestraDialogo.afterClosed().subscribe(result =>
      {
        if(result == "true"){
          this.deletePost(idPost);
        }
      }
      )
  }

}

