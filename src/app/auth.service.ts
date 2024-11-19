import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn!: boolean;
  username: string = '';
  router = inject(Router);

  constructor() {}

  logIn(username: string, password: string) {
    if (username == 'admin' && password == 'admin') {
      this.isLoggedIn = true;
      this.username = username;
      this.router.navigate(['/']);
    } else {
      this.isLoggedIn = false;
    }
  }

  logOut() {
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
