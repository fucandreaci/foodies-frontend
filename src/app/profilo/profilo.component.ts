import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  posts: Post[] = [];

  constructor(private postService: PostService, private router: Router,
      private shared: Shared) {}

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

}
