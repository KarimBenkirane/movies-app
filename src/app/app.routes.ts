import { Routes } from '@angular/router';
import { FilmDetailsComponent } from './film-details/film-details.component';
import { ListeFilmsComponent } from './liste-films/liste-films.component';
import { ConnexionComponent } from './connexion/connexion.component';

export const routes: Routes = [
  {
    path: '',
    component: ListeFilmsComponent,
  },
  {
    path: 'details/:id',
    component: FilmDetailsComponent,
  },
  {
    path: 'connexion',
    component: ConnexionComponent,
  },
];
