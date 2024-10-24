import { Component, inject, Input, OnInit } from '@angular/core';
import { FilmItemComponent } from '../film-item/film-item.component';
import { FilmsHelperService } from '../films-helper.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { Film } from '../models/Film';
import { BorderCardDirective } from '../border-card.directive';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-liste-films',
  standalone: true,
  imports: [
    FilmItemComponent,
    NavbarComponent,
    BorderCardDirective,
    RouterLink,
  ],
  templateUrl: './liste-films.component.html',
  styleUrl: './liste-films.component.css',
})
export class ListeFilmsComponent implements OnInit {
  @Input() films: Film[] = [];
  filmsHelper = inject(FilmsHelperService);
  @Input() displayFavorites: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (!this.displayFavorites) {
      this.filmsHelper.getAllFilms().subscribe((response: any) => {
        this.films = response.results;
      });
    }
  }

  isFavorite(film: Film): boolean {
    return this.filmsHelper.getFavoriteFilms().some((f) => f.id === film.id);
  }

  toggleFavorite(film: Film) {
    this.filmsHelper.toggleFavorite(film);
  }
}
