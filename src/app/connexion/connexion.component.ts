import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { FilmsHelperService } from '../films-helper.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [NavbarComponent, RouterLink, FormsModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css',
})
export class ConnexionComponent {
  email: string = '';
  password: string = '';
  filmsHelper = inject(FilmsHelperService);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  async onSubmit() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.filmsHelper.openSnackBar(
        'Veuillez saisir une adresse email valide !',
        'OK !'
      );
      return;
    }
    if (!this.email || !this.password) {
      this.filmsHelper.openSnackBar(
        'Veuillez ne laisser aucun champ vide !',
        'OK !'
      );
      return;
    }
    try {
      await this.authService.logIn(this.email, this.password);
    } catch (error: any) {
      this.filmsHelper.openSnackBar(
        "Une erreur s'est produite lors de la tentative de connexion.",
        'OK !'
      );
    }
  }
}
