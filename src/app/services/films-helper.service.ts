import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  catchError,
  forkJoin,
  map,
  Observable,
  of,
  Subject,
  switchMap,
} from 'rxjs';
import { Comment } from '../components/models/Comment';
import { Favorite } from '../components/models/Favorite';
import { Film } from '../components/models/Film';

@Injectable({
  providedIn: 'root',
})
export class FilmsHelperService {
  films: Film[] = [];
  snackBar = inject(MatSnackBar);

  API_KEY = 'c64f1b9081abb640667ac4fe9fd0cf9b';

  updateCount = new Subject<boolean>();
  update$ = this.updateCount.asObservable();

  constructor(private httpClient: HttpClient) {}

  getFavCount(userId: string): Observable<number> {
    return this.getFavorites(userId).pipe(map((elt) => elt.length));
  }
  getFavorites(userId: string): Observable<Film[]> {
    return this.httpClient
      .get<Favorite[]>(`http://localhost:8080/api/favorites/user/${userId}`)
      .pipe(
        switchMap((favorites) => {
          if (favorites.length > 0) {
            return forkJoin(
              favorites.map((favorite) => this.getFilmById(favorite.filmId))
            );
          } else {
            return of([]);
          }
        })
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

  toggleFavorite(userId: string, filmId: number): Observable<void> {
    return new Observable((observer) => {
      this.isFavorite(userId, filmId).subscribe({
        next: (result) => {
          if (result) {
            // Remove from favorites
            this.removeFromFavorites(userId, filmId).subscribe({
              next: () => observer.next(), // Notify the caller when done
              error: (err) => observer.error(err), // Handle errors during remove
            });
          } else {
            // Add to favorites
            this.addToFavorites({ userId: userId, filmId: filmId }).subscribe({
              next: () => observer.next(), // Notify the caller when done
              error: (err) => observer.error(err), // Handle errors during add
            });
          }
        },
        error: (err) => observer.error(err), // Handle errors from the `isFavorite` check
      });
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
