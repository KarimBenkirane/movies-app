import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchFilmComponent } from '../search-film/search-film.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SearchFilmComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input() favoriteCount: number = 0;
  @Output() searchedText = new EventEmitter<string>();

  sendToListFilms(searchInput: string) {
    this.searchedText.emit(searchInput);
  }
}
