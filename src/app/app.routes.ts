import { Routes } from '@angular/router';
import { FilmDetailsComponent } from './film-details/film-details.component';
import { ListeFilmsComponent } from './liste-films/liste-films.component';

export const routes: Routes = [
  {
    path: '',
    component: ListeFilmsComponent,
  },
  {
    path: 'details/:titre',
    component: FilmDetailsComponent,
  },
];
