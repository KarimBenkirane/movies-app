import { Routes } from '@angular/router';
import { FilmDetailsComponent } from './film-details/film-details.component';
import { ListeFilmsComponent } from './liste-films/liste-films.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FavoriteFilmsComponent } from './favorite-films/favorite-films.component';
import { InscriptionComponent } from './inscription/inscription.component';

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
    path: 'inscription',
    component: InscriptionComponent,
  },
  {
    path: 'connexion',
    component: ConnexionComponent,
  },
  {
    path: 'favoris',
    component: FavoriteFilmsComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
