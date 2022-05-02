import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postUrl = `${environment.baseUrl}/posts`

  constructor(private httpClient: HttpClient) { }

  getAllPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.postUrl}`)
  }

  getPostById(id: number): Observable<Post> { 
    return this.httpClient.get<Post>(`${this.postUrl}/${id}`);
  }

  addPost(formData: FormData): Observable<Post> { 
    return this.httpClient.post<Post>(`${this.postUrl}`, formData);
  }

  deletePostById(postId: number): Observable<any> { 
    return this.httpClient.delete(`${this.postUrl}/${postId}`);
  }

  updatePost(post: Post): Observable<Post> { 
    return this.httpClient.put<Post>(`${this.postUrl}`, post);
  }
}
