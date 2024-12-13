import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CastService {
  API_KEY = environment.tmdb.api_key;
  constructor(private httpClient: HttpClient) {}

  // this.cast = credits.cast;
  //   this.actors = this.cast.filter(
  //     (elt) => elt.known_for_department === 'Acting'
  //   );

  getFilmCreditsById(id: number): Observable<any> {
    return this.httpClient.get<any>(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${this.API_KEY}`
    );
  }
}
