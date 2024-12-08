import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { ConnexionComponent } from './connexion/connexion.component';
import { FavoriteFilmsComponent } from './favorite-films/favorite-films.component';
import { FilmDetailsComponent } from './film-details/film-details.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ListeFilmsComponent } from './liste-films/liste-films.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

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
    canActivate: [authGuard],
  },
  {
    path: 'erreur',
    component: PageNotFoundComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
