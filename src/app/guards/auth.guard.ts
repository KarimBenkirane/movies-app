import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FilmsHelperService } from '../services/films-helper.service';
import { UiService } from '../services/ui.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const filmsHelper = inject(FilmsHelperService);
  const router = inject(Router);
  const uiService = inject(UiService);

  if (authService.isLoggedIn) {
    return true;
  } else {
    router.navigate(['/connexion']);
    uiService.openSnackBar(
      'Veuillez vous connecter avant de voir vos favoris !'
    );
    return false;
  }
};
