import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn!: boolean;
  email: string = '';
  token: string = '';

  router = inject(Router);

  constructor(private auth: Auth) {}

  async register(email: string, password: string) {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (error: any) {
      console.log('Error', error);
      throw error;
    }
  }

  async logIn(email: string, password: string) {
    try {
      const userCredential: any = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      this.email = email;
      this.token = userCredential.user.accessToken;
      this.isLoggedIn = true;
      console.log(this.token);
      this.router.navigate(['/']);
    } catch (error) {
      this.isLoggedIn = false;
      throw error;
    }
  }

  async logOut() {
    await signOut(this.auth);
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
