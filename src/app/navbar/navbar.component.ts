import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { FilmsHelperService } from '../films-helper.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  filmsHelper = inject(FilmsHelperService);
  authService: AuthService = inject(AuthService);
  router = inject(Router);

  favCount: number = 0;
  @Output() onClearSearch = new EventEmitter();

  ngOnInit(): void {
    this.updateCount();
    this.filmsHelper.update$.subscribe((result) => {
      if (result) {
        this.updateCount();
      }
    });
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
