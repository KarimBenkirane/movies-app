import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
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

  constructor() {
    this.favCount = this.filmsHelper.getFavoriteFilms().length;
  }
}
