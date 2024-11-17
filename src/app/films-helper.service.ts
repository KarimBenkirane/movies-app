import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from './models/Comment';
import { Film } from './models/Film';

@Injectable({
  providedIn: 'root',
})
export class FilmsHelperService {
  favoriteFilms: Film[] = [];
  films: Film[] = [];
  comments: Array<{
    idFilm: number;
    comments: Comment[];
  }> = [];

  API_KEY = 'c64f1b9081abb640667ac4fe9fd0cf9b';

  constructor(private httpClient: HttpClient) {}

  isFavorite(film: Film): boolean {
    return this.favoriteFilms.some((f) => f.id === film.id);
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

  getCommentsByFilmId(id: number): Comment[] {
    // Find comments for the given film ID
    let entry = this.comments.find((elt) => elt.idFilm === id);

    // If no comments exist for the film, create an entry with an empty comments array
    if (!entry) {
      entry = { idFilm: id, comments: [] };
      this.comments.push(entry);
    }

    // Return the comments array (which is empty if it was just created)
    return entry.comments;
  }

  persistCommentsById(id: number, comments: Comment[]) {
    this.comments.find((elt) => elt.idFilm === id)!.comments = comments;
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
