import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-film-details',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './film-details.component.html',
  styleUrl: './film-details.component.css',
})
export class FilmDetailsComponent {}
