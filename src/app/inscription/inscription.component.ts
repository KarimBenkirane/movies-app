import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
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
  router: Router = inject(Router);

  async onSubmit() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      alert('Veuillez saisir une adresse email valide !');
      return;
    }
    if (this.password !== this.confirmPassword) {
      alert('Les mots de passes ne correspondent pas.');
      return;
    }
    if (!this.password || !this.confirmPassword || !this.email) {
      alert('Veuillez ne laisser aucun champ vide !');
      return;
    }
    if (this.password.length < 6) {
      alert('Veuillez saisir un mot de passe avec au moins 6 caractères');
      return;
    }
    try {
      await this.authService.register(this.email, this.password);
      alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      this.router.navigate(['/connexion']);
    } catch (error: any) {
      console.log(error);
      switch (error.code) {
        case 'auth/email-already-in-use':
          alert('Cet email est déjà utilisé.');
          break;
        case 'auth/invalid-email':
          alert('Email invalide');
          break;
        default:
          alert("Une erreur s'est produite, veuillez réessayer plus tard.");
      }
      this.password = '';
      this.confirmPassword = '';
      return;
    }
  }
}
