import { Component, inject, OnInit } from '@angular/core';
import { FilmsHelperService } from '../../services/films-helper.service';
import { ListeFilmsComponent } from '../liste-films/liste-films.component';

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
