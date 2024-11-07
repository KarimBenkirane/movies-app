import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmsHelperService } from '../films-helper.service';
import { Film } from '../models/Film';
import { DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { DecimalPipe } from '@angular/common';
import { Cast } from '../models/Cast';
import { ListeActeursComponent } from '../liste-acteurs/liste-acteurs.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { ListeCommentairesComponent } from '../liste-commentaires/liste-commentaires.component';
import { CreerCommentaireComponent } from '../creer-commentaire/creer-commentaire.component';

@Component({
  selector: 'app-film-details',
  standalone: true,
  imports: [
    NavbarComponent,
    DatePipe,
    FontAwesomeModule,
    DecimalPipe,
    ListeActeursComponent,
    ListeCommentairesComponent,
    CreerCommentaireComponent,
  ],
  templateUrl: './film-details.component.html',
  styleUrl: './film-details.component.css',
})
export class FilmDetailsComponent implements OnInit {
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  filmsHelper: FilmsHelperService = inject(FilmsHelperService);
  router: Router = inject(Router);
  filmId: number = Number(this.activatedRoute.snapshot.params['id']);
  film!: Film | undefined;
  cast: Cast[] = [];
  actors: Cast[] = [];
  trailerKey: string = '';
  sanitizedTrailerUrl: SafeResourceUrl | null = null;
  sanitizer: DomSanitizer = inject(DomSanitizer);

  comments:
    | Array<{ username: string; comment: string; date: Date }>
    | undefined = [];

  faStar = faStar;

  posterUrl = 'https://image.tmdb.org/t/p/w500';
  backdropUrl = 'https://image.tmdb.org/t/p/w1280/';

  ngOnInit(): void {
    this.filmsHelper.getFilmById(this.filmId).subscribe((film: Film) => {
      this.film = film;
    });

    this.filmsHelper
      .getFilmCreditsById(this.filmId)
      .subscribe((response: any) => {
        this.cast = response.cast;
        if (this.cast) {
          this.actors = this.cast.filter(
            (cast: Cast) => cast.known_for_department === 'Acting'
          );
        }
      });

    this.filmsHelper.getTrailerById(this.filmId).subscribe((response: any) => {
      let trailer = response.results.find(
        (elt: any) =>
          elt.type === 'Trailer' && elt.official && elt.site === 'YouTube'
      );
      this.trailerKey = trailer.key;

      if (this.trailerKey) {
        this.sanitizedTrailerUrl =
          this.sanitizer.bypassSecurityTrustResourceUrl(
            'https://www.youtube.com/embed/' + this.trailerKey
          );
      }
    });

    this.comments = this.filmsHelper.getCommentsByFilmId(this.filmId);
  }

  getDuration(runtime: number | undefined): string {
    if (runtime) {
      const hours = Math.floor(runtime / 60);
      const minutes = runtime % 60;
      return `${hours}h ${minutes}m`;
    }
    return '';
  }

  getGenres(genres: Array<{ id: number; name: string }> | undefined): string {
    if (genres) {
      const genreNames: string[] = genres.map((elt) => elt.name);
      return genreNames.join(', ');
    }
    return '';
  }

  sendComment($event: { username: string; comment: string; date: Date }) {
    this.comments?.unshift($event);
  }
}
