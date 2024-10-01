import { Component, inject } from '@angular/core';
import { Film } from '../models/Film';
import { FilmItemComponent } from '../film-item/film-item.component';
import { FilmsHelperService } from '../films-helper.service';

@Component({
  selector: 'app-liste-films',
  standalone: true,
  imports: [FilmItemComponent],
  templateUrl: './liste-films.component.html',
  styleUrl: './liste-films.component.css',
})
export class ListeFilmsComponent {
  films: Film[] = [];
  filmsHelper = inject(FilmsHelperService);

  constructor() {
    this.films = this.filmsHelper.getAllFilms();
  }
}
