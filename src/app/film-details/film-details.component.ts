import { Component, inject, Input } from '@angular/core';
import { Film } from '../models/Film';
import { ActivatedRoute } from '@angular/router';
import { FilmsHelperService } from '../films-helper.service';

@Component({
  selector: 'app-film-details',
  standalone: true,
  imports: [],
  templateUrl: './film-details.component.html',
  styleUrl: './film-details.component.css',
})
export class FilmDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  film: Film | undefined;
  filmsHelper = inject(FilmsHelperService);

  constructor() {
    const titre = this.route.snapshot.params['titre'];
    this.film = this.filmsHelper.getFilmByTitre(titre);
  }
}
