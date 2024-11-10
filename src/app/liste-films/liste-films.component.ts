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
  ],
  templateUrl: './liste-films.component.html',
  styleUrl: './liste-films.component.css',
})
export class ListeFilmsComponent implements OnInit, OnDestroy {
  @Input() films: Film[] = [];
  filmsHelper = inject(FilmsHelperService);
  @Input() displayFavorites: boolean = false;

  searchTerm = '';

  private searchSubject: Subject<string> = new Subject<string>();
  private searchSubscription!: Subscription;

  router = inject(Router);

  loading = false;

  faX = faX;

  constructor() {}

  ngOnInit(): void {
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((term) => {
          this.loading = true;
          if (!term) {
            return this.filmsHelper.getAllFilms();
          } else {
            return this.filmsHelper.searchFilms(term);
          }
        })
      )
      .subscribe({
        next: (response: any) => {
          this.films = response.results.filter(
            (elt: Film) => elt.poster_path !== null && elt.vote_count > 0
          );
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          console.error(err);
        },
      });

    if (!this.displayFavorites) {
      this.loading = true;
      this.filmsHelper.getAllFilms().subscribe((response: any) => {
        this.films = response.results;
        this.loading = false;
      });
    } else {
      this.films = this.filmsHelper.getFavoriteFilms();
    }
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  toggleFavorite(film: Film) {
    this.filmsHelper.toggleFavorite(film);
    if (this.displayFavorites) {
      this.films = this.filmsHelper.getFavoriteFilms();
    }
  }

  searchFilms() {
    this.searchSubject.next(this.searchTerm);
  }

  resetSearch() {
    if (this.searchTerm) {
      this.searchTerm = '';
      this.searchFilms();
    }
  }
}
