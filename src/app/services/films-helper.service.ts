import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Film } from '../components/models/Film';

@Injectable({
  providedIn: 'root',
})
export class FilmsHelperService {
  films: Film[] = [];
  snackBar = inject(MatSnackBar);

  API_KEY = environment.tmdb.api_key;

  updateCount = new Subject<boolean>();
  update$ = this.updateCount.asObservable();

  constructor(private httpClient: HttpClient) {}

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

  getTrailerById(id: number): Observable<any> {
    return this.httpClient.get<any>(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${this.API_KEY}`
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
