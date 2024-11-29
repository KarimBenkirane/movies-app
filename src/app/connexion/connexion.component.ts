import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
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

  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  async onSubmit() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      alert('Veuillez saisir une adresse email valide !');
      return;
    }
    if (!this.email || !this.password) {
      alert('Veuillez ne laisser aucun champ vide !');
      return;
    }
    try {
      await this.authService.logIn(this.email, this.password);
    } catch (error: any) {
      alert('Erreur');
    }
  }
}
