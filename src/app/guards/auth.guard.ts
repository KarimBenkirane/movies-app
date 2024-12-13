import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FilmsHelperService } from '../services/films-helper.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const filmsHelper = inject(FilmsHelperService);
  const router = inject(Router);
  if (authService.isLoggedIn) {
    return true;
  } else {
    router.navigate(['/connexion']);
    filmsHelper.openSnackBar(
      'Veuillez vous connecter avant de voir vos favoris !'
    );
    return false;
  }
};
