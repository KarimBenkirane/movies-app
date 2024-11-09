import { Component, inject, OnInit } from '@angular/core';
import { ListeFilmsComponent } from '../liste-films/liste-films.component';
import { FilmsHelperService } from '../films-helper.service';
import { Film } from '../models/Film';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-favorite-films',
  standalone: true,
  imports: [ListeFilmsComponent],
  templateUrl: './favorite-films.component.html',
  styleUrl: './favorite-films.component.css',
})
export class FavoriteFilmsComponent implements OnInit {
  filmsHelper = inject(FilmsHelperService);

  ngOnInit(): void {}
}
