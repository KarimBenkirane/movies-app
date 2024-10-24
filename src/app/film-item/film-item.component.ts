import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { FilmsHelperService } from '../films-helper.service';

@Component({
  selector: 'app-film-item',
  standalone: true,
  imports: [RouterOutlet, RouterLink, DatePipe, DecimalPipe, FontAwesomeModule],
  templateUrl: './film-item.component.html',
  styleUrl: './film-item.component.css',
})
export class FilmItemComponent {
  @Input() film!: Film;
  baseUrl = 'https://image.tmdb.org/t/p/w500';
  @Output() toggledFavorite = new EventEmitter();
  filmsHelper = inject(FilmsHelperService);

  @Input() favorite: boolean = false;

  faStar = faStar;
  faHeartSolid = faHeartSolid;
  faHeartRegular = faHeartRegular;
  faEllipsis = faEllipsis;

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
      this.openSnackBar('Film ajouté aux favoris!', 'OK !');
    } else {
      this.openSnackBar('Film retiré des favoris!', 'OK !');
    }
  }
}
