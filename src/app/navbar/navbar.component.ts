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
import { AuthService } from '../auth.service';
import { FilmsHelperService } from '../films-helper.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  filmsHelper = inject(FilmsHelperService);
  authService: AuthService = inject(AuthService);
  router = inject(Router);

  favCount: number = 0;
  @Output() onClearSearch = new EventEmitter();
  countSubscription!: Subscription;

  ngOnInit(): void {
    this.updateCount();
    this.countSubscription = this.filmsHelper.update$.subscribe((result) => {
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
      this.filmsHelper
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
