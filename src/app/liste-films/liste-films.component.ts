import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  Subscription,
  switchMap,
} from 'rxjs';
import { BorderCardDirective } from '../border-card.directive';
import { ChargementComponent } from '../chargement/chargement.component';
import { FilmItemComponent } from '../film-item/film-item.component';
import { FilmsHelperService } from '../films-helper.service';
import { Film } from '../models/Film';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-liste-films',
  standalone: true,
  imports: [
    FilmItemComponent,
    NavbarComponent,
    BorderCardDirective,
    FormsModule,
    FontAwesomeModule,
    ChargementComponent,
  ],
  templateUrl: './liste-films.component.html',
  styleUrl: './liste-films.component.css',
})
export class ListeFilmsComponent implements OnInit, OnDestroy {
  @Input() films: Film[] = [];
  filmsHelper = inject(FilmsHelperService);
  router = inject(Router);
  @Input() displayFavorites: boolean = false;

  searchTerm = '';
  private searchSubject: Subject<string> = new Subject<string>();
  private searchSubscription!: Subscription;

  faX = faX;

  loading!: boolean;

  showResultsMessage: boolean = false;
  showPopularMessage: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.loading = true;
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((term) => {
          this.loading = true;
          if (term) {
            this.showResultsMessage = true;
            this.showPopularMessage = false;
          } else {
            this.showPopularMessage = true;
            this.showResultsMessage = false;
          }
          return this.filmsHelper.searchFilms(term);
        })
      )
      .subscribe({
        next: (response: any) => {
          this.films = response.results.filter(
            (elt: Film) =>
              elt.poster_path !== null && elt.vote_count > 0 && elt.overview
          );
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        },
      });

    if (!this.displayFavorites) {
      this.searchSubject.next('');
    } else {
      this.films = this.filmsHelper.favoriteFilms;
      this.loading = false;
    }
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  toggleFavorite(film: Film) {
    this.filmsHelper.toggleFavorite(film);
    if (this.displayFavorites) {
      this.films = this.filmsHelper.favoriteFilms;
    }
  }

  searchFilms() {
    this.showResultsMessage = false;
    this.searchSubject.next(this.searchTerm);
  }

  resetSearch() {
    if (this.searchTerm) {
      this.loading = true;
      this.searchTerm = '';
      this.searchFilms();
    }
  }
}
