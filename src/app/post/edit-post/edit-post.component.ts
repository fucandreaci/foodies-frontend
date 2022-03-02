import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { Utente } from 'src/app/models/utente';
import { PostService } from 'src/app/services/post.service';
import { Shared } from 'src/app/services/shared';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  actualPost!: Post;

  errorMsg!: string;

  constructor(private shared: Shared, private postService: PostService,
      private router: Router) { }

  ngOnInit(): void {
    this.actualPost = this.shared.actualEditPost;
    if(this.actualPost === undefined){
      this.actualPost = new Post()
      this.router.navigate(['profilo'])
    }
  }

  editPost(){
    var user = new Utente();
    user.username = (localStorage.getItem('username')!);
    user.password = (localStorage.getItem('password')!);

    this.postService.updatePost(this.actualPost!, user).subscribe(
      (response) => {
        this.router.navigate(['/profilo']);
      },
      (error: HttpErrorResponse) => {
        console.log(error)
      }
    )
  }

}
