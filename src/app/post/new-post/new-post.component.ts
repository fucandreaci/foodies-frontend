import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from '../../models/post';
import { Utente } from '../../models/utente';
import { PostService } from '../../services/post.service';
import { Shared } from '../../services/shared';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  errorMsg!: string;

  constructor(private postService: PostService,
    private router: Router, private shared: Shared) { }

  ngOnInit(): void { }

  addPost(form: NgForm){
    var user = new Utente();
    user.username = (localStorage.getItem('username')!);
    user.password = (localStorage.getItem('password')!);

    var post = new Post(form.value);

    this.postService.addPost(user, post).subscribe(
      (response: any) => {
        this.router.navigate(['/home']);
      },
      (error: HttpErrorResponse) => {
        this.errorMsg = error.error;
      }
    )
  }

}
