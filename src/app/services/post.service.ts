import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';
import { Utente } from '../models/utente';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getPosts(user: Utente): Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/posts/getAll/`, {headers:
      {
        username: localStorage.getItem("username") + "",
        password: localStorage.getItem("password") + "",
        'Content-Type': 'application/json; charset=utf-8'
      }
     })
  }

  getPostsByUser(user: Utente): Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/posts/getByUser/`, {headers:
      {
        username: localStorage.getItem("username") + "",
        password: localStorage.getItem("password") + "",
        'Content-Type': 'application/json; charset=utf-8'
      }
     })
  }

  addPost(user: Utente, post: Post): Observable<any>{
    return this.http.post<any>(`${this.apiServerUrl}/posts/insert/`, {
      ...post,
      ...user
    })
  }

  deletePost(idPost: number): Observable<any>{
    return this.http.delete<any>(`${this.apiServerUrl}/posts/deletePost/` + idPost, {headers:
      {
        username: localStorage.getItem("username") + "",
        password: localStorage.getItem("password") + "",
        'Content-Type': 'application/json; charset=utf-8'
      }
     })
  }

  updatePost(post: Post, user: Utente): Observable<any>{
    const data = {
      ...post,
      ...user
    }
    console.log(data)
    return this.http.patch<any>(`${this.apiServerUrl}/posts/patchPost/`+ post.id, data)
  }

  getLastUpdateBetween(user: Utente, from: string, to: string): Observable<any>{
    const data = {
      ...user,
      to: to,
      from: from
    }
    return this.http.post<any>(`${this.apiServerUrl}/posts/getLastUpdateBetween/`, data)
  }

  getPostByFiltro(post: Post, user: Utente){
    const data = {
      ...user,
      ...post
    }
    return this.http.post<any>(`${this.apiServerUrl}/posts/getTitoloOrDescrizioneContains/`, data)
  }

  like(user: Utente, idPost: number): Observable<any>{
    return this.http.post<any>(`${this.apiServerUrl}/posts/addLike/` + idPost, user)
  }

  unlike(user: Utente, idPost: number): Observable<any>{
    return this.http.post<any>(`${this.apiServerUrl}/posts/addUnLike/` + idPost, user)
  }


}
