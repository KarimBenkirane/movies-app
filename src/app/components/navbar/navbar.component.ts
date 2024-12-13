import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { FavoritesService } from '../../services/favorites.service';
import { FilmsHelperService } from '../../services/films-helper.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  filmsHelper = inject(FilmsHelperService);
  uiService = inject(UiService);
  favoritesService = inject(FavoritesService);
  authService: AuthService = inject(AuthService);
  router = inject(Router);

  favCount: number = 0;
  @Output() onClearSearch = new EventEmitter();
  countSubscription!: Subscription;

  ngOnInit(): void {
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
    if (this.router.url === '/') {
      this.onClearSearch.emit();
    }
  }
}
