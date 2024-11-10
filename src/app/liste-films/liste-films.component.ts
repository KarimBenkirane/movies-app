import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FilmItemComponent } from '../film-item/film-item.component';
import { FilmsHelperService } from '../films-helper.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { Film } from '../models/Film';
import { BorderCardDirective } from '../border-card.directive';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  Subscription,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-liste-films',
  standalone: true,
  imports: [
    FilmItemComponent,
    NavbarComponent,
    BorderCardDirective,
    FormsModule,
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

  loading = false;

  constructor() {}

  ngOnInit(): void {
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(500),
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
          this.films = response.results;
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
    this.searchSubscription.unsubscribe();
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
}
