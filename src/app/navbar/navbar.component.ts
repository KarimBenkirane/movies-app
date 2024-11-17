import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FilmsHelperService } from '../films-helper.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input() favCount = 0;
  filmsHelper = inject(FilmsHelperService);
  router = inject(Router);

  constructor() {
    this.favCount = this.filmsHelper.favoriteFilms.length;
  }
}
