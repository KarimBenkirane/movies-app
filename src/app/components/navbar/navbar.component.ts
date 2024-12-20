import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Genre } from '../../models/Genre';
import { AuthService } from '../../services/auth.service';
import { FavoritesService } from '../../services/favorites.service';
import { FilmsHelperService } from '../../services/films-helper.service';
import { GenresService } from '../../services/genres.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatMenuModule, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  filmsHelper = inject(FilmsHelperService);
  genresService = inject(GenresService);
  uiService = inject(UiService);
  favoritesService = inject(FavoritesService);
  authService: AuthService = inject(AuthService);
  router = inject(Router);
  genres: Genre[] = [];
  favCount: number = 0;
  @Output() onClearSearch = new EventEmitter();
  countSubscription!: Subscription;

  faChevronDown = faChevronDown;

  ngOnInit(): void {
    this.genresService.getGenresList().subscribe((response: any) => {
      this.genres = response.genres;
    });
    this.updateCount();
    this.countSubscription = this.uiService.update$.subscribe((result) => {
      if (result) {
        this.updateCount();
      }
    });
  }
  ngOnDestroy(): void {
    this.countSubscription.unsubscribe();
  }
  updateCount() {
    if (this.authService.userId) {
      this.favoritesService
        .getFavCount(this.authService.userId)
        .subscribe((result) => (this.favCount = result));
    }
  }
  clearSearch() {
    this.onClearSearch.emit();
  }
}
