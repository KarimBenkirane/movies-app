import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmsHelperService } from '../films-helper.service';
import { Film } from '../models/Film';
import { DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-film-details',
  standalone: true,
  imports: [NavbarComponent, DatePipe, FontAwesomeModule, DecimalPipe],
  templateUrl: './film-details.component.html',
  styleUrl: './film-details.component.css',
})
export class FilmDetailsComponent implements OnInit {
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  filmsHelper: FilmsHelperService = inject(FilmsHelperService);
  router: Router = inject(Router);
  filmId: number = Number(this.activatedRoute.snapshot.params['id']);
  film!: Film | undefined;

  faStar = faStar;

  posterUrl = 'https://image.tmdb.org/t/p/w500';

  ngOnInit(): void {
    this.filmsHelper.getFilmById(this.filmId).subscribe((film: Film) => {
      this.film = film;
    });
    console.log(this.film);
  }

  getDuration(runtime: number | undefined): string {
    if (runtime != undefined) {
      const hours = Math.floor(runtime / 60);
      const minutes = runtime % 60;
      return `${hours}h ${minutes}m`;
    }
    return '';
  }

  getGenres(genres: Array<{ id: number; name: string }> | undefined): string {
    if (genres !== undefined) {
      const genreNames: string[] = [];
      genres.forEach((elt) => genreNames.push(elt.name));
      return genreNames.join(', ');
    }
    return '';
  }
}
