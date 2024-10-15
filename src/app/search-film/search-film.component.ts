import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Film } from '../models/Film';
import { FilmsHelperService } from '../films-helper.service';

@Component({
  selector: 'app-search-film',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-film.component.html',
  styleUrl: './search-film.component.css',
})
export class SearchFilmComponent {
  filteredFilms: Film[] = [];
  filmService = inject(FilmsHelperService);
  searchedText: string = '';
  @Output() searchInput = new EventEmitter<string>();

  searchFilm() {
    this.searchInput.emit(this.searchedText);
  }
}
