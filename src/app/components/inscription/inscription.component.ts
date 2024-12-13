import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FilmsHelperService } from '../../services/films-helper.service';
import { UiService } from '../../services/ui.service';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [NavbarComponent, RouterLink, FormsModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css',
})
export class InscriptionComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  authService: AuthService = inject(AuthService);
  filmsHelper = inject(FilmsHelperService);
  uiService = inject(UiService);
  router: Router = inject(Router);

  async onSubmit() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.uiService.openSnackBar('Veuillez saisir une adresse email valide !');

      return;
    }
    if (this.password !== this.confirmPassword) {
      this.uiService.openSnackBar('Les mots de passes ne correspondent pas.');
      return;
    }
    if (!this.password || !this.confirmPassword || !this.email) {
      this.uiService.openSnackBar('Veuillez ne laisser aucun champ vide !');
      return;
    }
    if (this.password.length < 6) {
      this.uiService.openSnackBar(
        'Veuillez saisir un mot de passe avec au moins 6 caractères'
      );
      return;
    }
    try {
      await this.authService.register(this.email, this.password);
      this.uiService.openSnackBar(
        'Inscription réussie ! Vous pouvez maintenant vous connecter.'
      );
      this.router.navigate(['/connexion']);
    } catch (error: any) {
      console.log(error);
      switch (error.code) {
        case 'auth/email-already-in-use':
          this.uiService.openSnackBar('Cet email est déjà utilisé.');
          break;
        case 'auth/invalid-email':
          this.uiService.openSnackBar('Email invalide');
          break;
        default:
          this.uiService.openSnackBar(
            "Une erreur s'est produite, veuillez réessayer plus tard."
          );
      }
      this.password = '';
      this.confirmPassword = '';
      return;
    }
  }
}
