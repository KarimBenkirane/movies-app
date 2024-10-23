import { Component, inject, OnInit } from '@angular/core';
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
  films: Film[] = [];
  filmsHelper = inject(FilmsHelperService);
  favoriteFilms: Film[] = [];

  constructor() {}

  ngOnInit(): void {
    this.filmsHelper.getAllFilms().subscribe((response: any) => {
      this.films = response.results;
    });
  }

  toggleFavorite(film: Film) {
    if (this.favoriteFilms.includes(film)) {
      this.favoriteFilms = this.favoriteFilms.filter((elt) => elt != film);
    } else {
      this.favoriteFilms.push(film);
    }
  }
}
