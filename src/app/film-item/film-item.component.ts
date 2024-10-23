import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Film } from '../models/Film';
import { DatePipe } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-film-item',
  standalone: true,
  imports: [RouterOutlet, RouterLink, DatePipe, DecimalPipe, FontAwesomeModule],
  templateUrl: './film-item.component.html',
  styleUrl: './film-item.component.css',
})
export class FilmItemComponent {
  @Input() film!: Film;
  baseUrl = 'https://image.tmdb.org/t/p/w300';
  @Output() toggledFavorite = new EventEmitter();
  favorite = false;
  faStar = faStar;
  faHeartSolid = faHeartSolid;
  faHeartRegular = faHeartRegular;
  faEllipsis = faEllipsis;

  constructor(private router: Router) {}

  goToDetails(filmId: number) {
    this.router.navigate(['/details', filmId]);
  }

  toggleFavorite(film: Film) {
    this.toggledFavorite.emit(film);
    this.favorite = !this.favorite;
  }
}
