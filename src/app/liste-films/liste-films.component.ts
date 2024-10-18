import { Component, inject, OnInit } from '@angular/core';
import { FilmItemComponent } from '../film-item/film-item.component';
import { FilmsHelperService } from '../films-helper.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { Film } from '../models/Film';
import { BorderCardDirective } from '../border-card.directive';

@Component({
  selector: 'app-liste-films',
  standalone: true,
  imports: [FilmItemComponent, NavbarComponent, BorderCardDirective],
  templateUrl: './liste-films.component.html',
  styleUrl: './liste-films.component.css',
})
export class ListeFilmsComponent implements OnInit {
  films: Film[] = [];
  filmsHelper = inject(FilmsHelperService);

  constructor() {}

  ngOnInit(): void {
    this.filmsHelper.getAllFilms().subscribe((response: any) => {
      this.films = response.results;
    });

    console.log(this.films);
  }
}
