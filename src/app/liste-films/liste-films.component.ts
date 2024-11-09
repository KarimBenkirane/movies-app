import { Component, inject, Input, OnInit } from '@angular/core';
import { FilmItemComponent } from '../film-item/film-item.component';
import { FilmsHelperService } from '../films-helper.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { Film } from '../models/Film';
import { BorderCardDirective } from '../border-card.directive';
import { Router, RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-liste-films',
  standalone: true,
  imports: [
    FilmItemComponent,
    NavbarComponent,
    BorderCardDirective,
    MatProgressSpinnerModule,
  ],
  templateUrl: './liste-films.component.html',
  styleUrl: './liste-films.component.css',
})
export class ListeFilmsComponent implements OnInit {
  @Input() films: Film[] = [];
  filmsHelper = inject(FilmsHelperService);
  @Input() displayFavorites: boolean = false;
  loading = true;

  constructor() {}

  ngOnInit(): void {
    if (!this.displayFavorites) {
      this.filmsHelper.getAllFilms().subscribe((response: any) => {
        this.films = response.results;
        this.loading = false;
      });
    } else {
      this.films = this.filmsHelper.getFavoriteFilms();
      this.loading = false;
    }
  }

  toggleFavorite(film: Film) {
    this.filmsHelper.toggleFavorite(film);
    if (this.displayFavorites) {
      this.films = this.filmsHelper.getFavoriteFilms();
    }
  }
}
