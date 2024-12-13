import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Comment } from '../components/models/Comment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private httpClient: HttpClient) {}

  postCommSubject = new Subject<Comment>();
  postComm$ = this.postCommSubject.asObservable();

  getCommentsByFilmId(filmId: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(
      'http://localhost:8080/api/comments/' + filmId
    );
  }

  postComment(filmId: number, comment: Comment): Observable<Comment> {
    return this.httpClient.post<Comment>(
      'http://localhost:8080/api/comments/' + filmId,
      comment
    );
  }
}
