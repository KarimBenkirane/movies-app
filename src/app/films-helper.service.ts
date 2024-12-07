import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Comment } from './models/Comment';
import { Film } from './models/Film';

@Injectable({
  providedIn: 'root',
})
export class FilmsHelperService {
  favoriteFilms: Film[] = [];
  films: Film[] = [];
  snackBar = inject(MatSnackBar);

  API_KEY = 'c64f1b9081abb640667ac4fe9fd0cf9b';

  constructor(private httpClient: HttpClient) {}

  isFavorite(film: Film): boolean {
    return this.favoriteFilms.some((f) => f.id === film.id);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  toggleFavorite(film: Film) {
    if (this.favoriteFilms.some((f) => f.id === film.id)) {
      this.favoriteFilms = this.favoriteFilms.filter((elt) => elt != film);
    } else {
      this.favoriteFilms.push(film);
    }
  }

  getAllFilms(): Observable<any> {
    return this.httpClient.get<any>(
      `https://api.themoviedb.org/3/movie/popular?api_key=${this.API_KEY}&language=fr-FR&include_adult=false`
    );
  }

  getFilmById(id: number): Observable<Film> {
    return this.httpClient.get<Film>(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${this.API_KEY}&language=fr-FR`
    );
  }

  getFilmCreditsById(id: number): Observable<any> {
    return this.httpClient.get<any>(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${this.API_KEY}`
    );
  }

  getTrailerById(id: number): Observable<any> {
    return this.httpClient.get<any>(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${this.API_KEY}`
    );
  }

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

  searchFilms(title: string): Observable<any> {
    if (!title) {
      return this.getAllFilms();
    }
    return this.httpClient.get<any>(
      `https://api.themoviedb.org/3/search/movie?api_key=${this.API_KEY}&query=${title}&language=fr-FR&include_adult=false`
    );
  }
}
