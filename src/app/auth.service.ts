import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn!: boolean;
  userId: string = '';
  email: string = '';
  rememberMe!: boolean;
  storageService = inject(StorageService);

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
      this.userId = userCredential.user.uid;
      this.isLoggedIn = true;
      if (this.rememberMe) {
        this.storageService.setItem('user', {
          userId: this.userId,
          email: this.email,
        });
      }
      this.router.navigate(['/']);
    } catch (error) {
      this.isLoggedIn = false;
      throw error;
    }
  }

  async logOut() {
    await signOut(this.auth);
    this.isLoggedIn = false;
    this.storageService.removeItem('user');
    this.router.navigate(['/']);
  }

  loadFromStorage() {
    const user = this.storageService.getItem('user');
    if (user) {
      this.email = user.email;
      this.userId = user.userId;
      this.isLoggedIn = true;
    }
  }
}
