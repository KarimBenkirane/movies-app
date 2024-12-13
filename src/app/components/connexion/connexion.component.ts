import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FilmsHelperService } from '../../services/films-helper.service';
import { UiService } from '../../services/ui.service';
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
  uiService = inject(UiService);
  router: Router = inject(Router);

  async onSubmit() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.uiService.openSnackBar('Veuillez saisir une adresse email valide !');
      return;
    }
    if (!this.email || !this.password) {
      this.uiService.openSnackBar('Veuillez ne laisser aucun champ vide !');
      return;
    }
    try {
      await this.authService.logIn(this.email, this.password);
      this.uiService.openSnackBar(
        `Connexion réussie ! Bienvenue ${this.authService.email}`
      );
      this.router.navigate(['/']);
    } catch (error: any) {
      console.log(error);
      switch (error.code) {
        case 'auth/invalid-credential':
          this.uiService.openSnackBar('Email ou mot de passe incorrect.');
          break;
        case 'auth/wrong-password':
          this.uiService.openSnackBar('Mot de passe incorrect.');
          break;
        case 'auth/invalid-email':
          this.uiService.openSnackBar('Email invalide.');
          break;
        case 'auth/user-disabled':
          this.uiService.openSnackBar('Cet utilisateur a été désactivé.');
          break;
        default:
          this.uiService.openSnackBar(
            "Une erreur s'est produite, veuillez réessayer plus tard."
          );
      }
    }
  }
}
