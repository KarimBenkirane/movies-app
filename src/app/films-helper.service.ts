import { Injectable } from '@angular/core';
import { Film } from './models/Film';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FilmsHelperService {
  favoriteFilms: Film[] = [];

  constructor(private httpClient: HttpClient) {}

  getFavoriteFilms(): Film[] {
    return this.favoriteFilms;
  }

  toggleFavorite(film: Film) {
    if (this.favoriteFilms.some((f) => f.id === film.id)) {
      this.favoriteFilms = this.favoriteFilms.filter((elt) => elt != film);
    } else {
      this.favoriteFilms.push(film);
    }
  }

  getAllFilms() {
    return this.httpClient.get<Film[]>(
      'https://api.themoviedb.org/3/movie/popular?api_key=a2f888b27315e62e471b2d587048f32e&language=fr-FR&include_adult=false'
    );
  }
}
