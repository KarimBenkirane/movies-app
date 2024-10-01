import { Component, Input } from '@angular/core';
import { Film } from '../models/Film';

@Component({
  selector: 'app-film-item',
  standalone: true,
  imports: [],
  templateUrl: './film-item.component.html',
  styleUrl: './film-item.component.css',
})
export class FilmItemComponent {
  @Input() film!: Film;
}
