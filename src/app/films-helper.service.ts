import { Injectable } from '@angular/core';
import { Film } from './models/Film';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilmsHelperService {
  favoriteFilms: Film[] = [];
  films: Film[] = [];
  comments: Array<{
    idFilm: number;
    comments: Array<{ username: string; comment: string }>;
  }> = [
    {
      idFilm: 912649,
      comments: [
        {
          username: 'Username 1',
          comment: 'Comment 1',
        },
        {
          username: 'Username 2',
          comment: 'Comment 2',
        },
      ],
    },
    {
      idFilm: 1184918,
      comments: [
        {
          username: 'Username 1',
          comment: 'Comment 1',
        },
        {
          username: 'Username 2',
          comment: 'Comment 2',
        },
      ],
    },
  ];

  API_KEY = 'a2f888b27315e62e471b2d587048f32e';

  constructor(private httpClient: HttpClient) {}

  getFavoriteFilms(): Film[] {
    return this.favoriteFilms;
  }

  isFavorite(film: Film): boolean {
    return this.getFavoriteFilms().some((f) => f.id === film.id);
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

  getCommentsByFilmId(
    id: number
  ): Array<{ username: string; comment: string }> | undefined {
    return this.comments.find((elt) => elt.idFilm === id)?.comments;
  }
}
