import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Film } from '../models/Film';

@Injectable({
  providedIn: 'root',
})
export class GenresService {
  API_KEY = environment.tmdb.api_key;

  constructor(private httpClient: HttpClient) {}

  getGenresList(): Observable<any> {
    return this.httpClient.get<any>(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.API_KEY}&language=fr-FR&include_adult=false`
    );
  }

  getFilmsByGenreId(genreId: number) {
    return this.httpClient.get<Film[]>(
      `https://api.themoviedb.org/3/discover/movie?api_key=${this.API_KEY}&with_genres=${genreId}&include_adult=false&language=fr-FR`
    );
  }
}
