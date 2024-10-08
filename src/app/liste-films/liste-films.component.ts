import { Component, inject, OnInit } from '@angular/core';
import { Film } from '../models/Film';
import { FilmItemComponent } from '../film-item/film-item.component';
import { FilmsHelperService } from '../films-helper.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-liste-films',
  standalone: true,
  imports: [FilmItemComponent, NavbarComponent],
  templateUrl: './liste-films.component.html',
  styleUrl: './liste-films.component.css',
})
export class ListeFilmsComponent implements OnInit {
  films: Film[] = [];
  filmsHelper = inject(FilmsHelperService);
  favoriteFilms: Film[] = [];

  constructor() {}

  ngOnInit(): void {
    this.films = this.filmsHelper.getAllFilms();
  }

  afficherTitreFilm(titre: string) {
    alert(titre);
  }

  addToFavorite(film: Film) {
    this.favoriteFilms.push(film);
  }

  getFavoriteCount() {
    return this.favoriteFilms.length;
  }
}
