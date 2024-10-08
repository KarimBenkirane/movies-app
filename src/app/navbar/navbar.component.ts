import { Component, Input } from '@angular/core';
import { ListeFilmsComponent } from '../liste-films/liste-films.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ListeFilmsComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input() favoriteCount: number = 0;
}
