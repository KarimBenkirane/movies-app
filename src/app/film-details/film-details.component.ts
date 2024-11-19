import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FilmsHelperService } from '../films-helper.service';
import { ListeActeursComponent } from '../liste-acteurs/liste-acteurs.component';
import { Cast } from '../models/Cast';
import { Film } from '../models/Film';
import { NavbarComponent } from '../navbar/navbar.component';

import { CreerCommentaireComponent } from '../creer-commentaire/creer-commentaire.component';
import { ListeCommentairesComponent } from '../liste-commentaires/liste-commentaires.component';

import { MatDividerModule } from '@angular/material/divider';

import { forkJoin } from 'rxjs';
import { AuthService } from '../auth.service';
import { ChargementComponent } from '../chargement/chargement.component';

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
    MatDividerModule,
    ChargementComponent,
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

  authService = inject(AuthService);

  comments:
    | Array<{
        username: string;
        comment: string;
        rating: number;
        date: Date;
      }>
    | undefined = [];

  faStar = faStar;

  loading!: boolean;

  posterUrl = 'https://image.tmdb.org/t/p/w500';
  backdropUrl = 'https://image.tmdb.org/t/p/w780/';

  ngOnInit(): void {
    this.loading = true;
    forkJoin({
      film: this.filmsHelper.getFilmById(this.filmId),
      credits: this.filmsHelper.getFilmCreditsById(this.filmId),
      trailer: this.filmsHelper.getTrailerById(this.filmId),
    }).subscribe({
      next: ({ film, credits, trailer }) => {
        this.film = film;
        this.cast = credits.cast;
        this.actors = this.cast.filter(
          (elt) => elt.known_for_department === 'Acting'
        );
        const trailerItem = trailer.results.find(
          (elt: any) =>
            elt.type === 'Trailer' && elt.official && elt.site == 'YouTube'
        );
        if (trailerItem) {
          this.trailerKey = trailerItem.key;
          this.sanitizedTrailerUrl =
            this.sanitizer.bypassSecurityTrustResourceUrl(
              'https://www.youtube.com/embed/' + this.trailerKey
            );
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.router.navigate(['/erreur']);
      },
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

  sendComment($event: {
    username: string;
    comment: string;
    rating: number;
    date: Date;
  }) {
    this.comments?.unshift($event);
    this.filmsHelper.persistCommentsById(this.filmId, this.comments || []);
  }
}
