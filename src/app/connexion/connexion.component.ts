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
  username: string = '';
  password: string = '';

  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  onSubmit() {
    this.authService.logIn(this.username, this.password);
    if (!this.authService.isLoggedIn) {
      alert('Mauvais email ou mot de passe (admin/admin)');
      this.password = '';
    }
  }
}
