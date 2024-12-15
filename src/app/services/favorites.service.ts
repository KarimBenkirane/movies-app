import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { Favorite } from '../models/Favorite';
import { Film } from '../models/Film';
import { FilmsHelperService } from './films-helper.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  filmsHelper = inject(FilmsHelperService);
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
              favorites.map((favorite) =>
                this.filmsHelper.getFilmById(favorite.filmId)
              )
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
}
