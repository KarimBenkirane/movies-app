import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { Comment } from './models/Comment';
import { Favorite } from './models/Favorite';
import { Film } from './models/Film';

@Injectable({
  providedIn: 'root',
})
export class FilmsHelperService {
  films: Film[] = [];
  snackBar = inject(MatSnackBar);

  API_KEY = 'c64f1b9081abb640667ac4fe9fd0cf9b';

  constructor(private httpClient: HttpClient) {}

  getFavorites(userId: string): Observable<Film[]> {
    return this.httpClient
      .get<Favorite[]>(`http://localhost:8080/api/favorites/user/${userId}`)
      .pipe(
        switchMap((favorites) =>
          forkJoin(
            favorites.map((favorite) => this.getFilmById(favorite.filmId))
          )
        )
      );
  }

  isFavorite(userId: string, filmId: number): Observable<boolean> {
    return this.httpClient
      .get<Favorite>(
        `http://localhost:8080/api/favorites/user/${userId}/film/${filmId}`
      )
      .pipe(
        map((favorite) => !!favorite),
        catchError(() => of(false))
      );
  }

  addToFavorites(favorite: Favorite): Observable<Favorite> {
    return this.httpClient.post<Favorite>(
      `http://localhost:8080/api/favorites/add`,
      favorite
    );
  }

  removeFromFavorites(userId: string, filmId: number): Observable<Favorite> {
    return this.httpClient.delete<Favorite>(
      `http://localhost:8080/api/favorites/user/${userId}/film/${filmId}`
    );
  }

  toggleFavorite(userId: string, filmId: number): void {
    this.isFavorite(userId, filmId).subscribe({
      next: (result) => {
        if (result) {
          this.removeFromFavorites(userId, filmId).subscribe();
        } else {
          this.addToFavorites({ userId: userId, filmId: filmId }).subscribe();
        }
      },
      error: (err) => {
        console.error('Error toggling favorite:', err);
      },
    });
  }

  openSnackBar(message: string, action: string = 'OK !') {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
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
