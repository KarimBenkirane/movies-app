import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
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
export class NavbarComponent {
  filmsHelper = inject(FilmsHelperService);
  authService: AuthService = inject(AuthService);
  router = inject(Router);

  @Input() favCount = 0;
  @Output() onClearSearch = new EventEmitter();

  clearSearch() {
    if (this.router.url === '/') {
      this.onClearSearch.emit();
    }
  }
}
