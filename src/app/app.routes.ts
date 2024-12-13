import { Routes } from '@angular/router';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { FavoriteFilmsComponent } from './components/favorite-films/favorite-films.component';
import { FilmDetailsComponent } from './components/film-details/film-details.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { ListeFilmsComponent } from './components/liste-films/liste-films.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { authGuard } from './guards/auth.guard';

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
