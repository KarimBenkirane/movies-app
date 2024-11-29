import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import {
  faEllipsis,
  faHeart as faHeartSolid,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth.service';
import { Film } from '../models/Film';

@Component({
  selector: 'app-film-item',
  standalone: true,
  imports: [DatePipe, DecimalPipe, FontAwesomeModule],
  templateUrl: './film-item.component.html',
  styleUrl: './film-item.component.css',
})
export class FilmItemComponent {
  @Input() film!: Film;
  baseUrl = 'https://image.tmdb.org/t/p/w500';
  @Output() toggledFavorite = new EventEmitter();

  @Input() favorite: boolean = false;

  faStar = faStar;
  faHeartSolid = faHeartSolid;
  faHeartRegular = faHeartRegular;
  faEllipsis = faEllipsis;

  authService = inject(AuthService);
  snackBar = inject(MatSnackBar);

  constructor(private router: Router) {}

  goToDetails(filmId: number) {
    this.router.navigate(['/details', filmId]);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  toggleFavorite(film: Film) {
    this.toggledFavorite.emit(film);
    this.favorite = !this.favorite;
    if (this.favorite) {
      this.openSnackBar('Film ajouté aux favoris !', 'OK !');
    } else {
      this.openSnackBar('Film retiré des favoris !', 'OK !');
    }
  }
}
