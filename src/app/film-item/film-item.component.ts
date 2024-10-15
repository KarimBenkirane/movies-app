import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Film } from '../models/Film';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-film-item',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './film-item.component.html',
  styleUrl: './film-item.component.css',
})
export class FilmItemComponent {
  @Input() film!: Film;
  @Output() selectedFilmTitle = new EventEmitter<string>();
  @Output() favoriteFilm = new EventEmitter<Film>();

  onClick() {
    this.selectedFilmTitle.emit(this.film?.titre);
  }

  onAddFavorite() {
    this.favoriteFilm.emit(this.film);
  }

  getYear(): number {
    return new Date().getFullYear();
  }
}
