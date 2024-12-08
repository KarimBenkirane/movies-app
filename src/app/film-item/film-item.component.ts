import { DatePipe, DecimalPipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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
import { FilmsHelperService } from '../films-helper.service';
import { Film } from '../models/Film';

@Component({
  selector: 'app-film-item',
  standalone: true,
  imports: [DatePipe, DecimalPipe, FontAwesomeModule],
  templateUrl: './film-item.component.html',
  styleUrl: './film-item.component.css',
})
export class FilmItemComponent implements OnInit {
  @Input() film!: Film;
  baseUrl = 'https://image.tmdb.org/t/p/w500';
  @Output() toggledFavorite = new EventEmitter();

  @Input() favorite!: boolean;
  filmsHelper = inject(FilmsHelperService);

  faStar = faStar;
  faHeartSolid = faHeartSolid;
  faHeartRegular = faHeartRegular;
  faEllipsis = faEllipsis;

  authService = inject(AuthService);
  snackBar = inject(MatSnackBar);

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.filmsHelper
      .isFavorite(this.authService.userId, this.film.id)
      .subscribe((result) => (this.favorite = result));
  }

  goToDetails(filmId: number) {
    this.router.navigate(['/details', filmId]);
  }

  toggleFavorite(film: Film) {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/connexion']);
      this.filmsHelper.openSnackBar(
        "Veuillez vous connecter avant d'ajouter un film à vos favoris !",
        'OK !'
      );
      return;
    }
    this.toggledFavorite.emit({ film, favorite: this.favorite });
    this.favorite = !this.favorite;
    if (this.favorite) {
      this.filmsHelper.openSnackBar('Film ajouté aux favoris !', 'OK !');
    } else {
      this.filmsHelper.openSnackBar('Film retiré des favoris !', 'OK !');
    }
  }
}
