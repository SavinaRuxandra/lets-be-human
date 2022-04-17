import { HttpClient } from '@angular/common/http';
import { Byte } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { combineLatestAll, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postUrl = `${environment.baseUrl}/posts`

  constructor(private httpClient: HttpClient) { }

  addPost(formData: FormData): Observable<Post> { 
    return this.httpClient.post<Post>(`${this.postUrl}`, formData);
  }

  getAllPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.postUrl}`)
  }
}
