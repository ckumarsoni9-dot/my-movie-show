import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _loggedIn = signal(false);

  isLoggedIn = this._loggedIn.asReadonly();

  login(username: string, password: string): boolean {
    // For simplicity, use fixed credentials
    if (username === 'admin' && password === 'admin') {
      this._loggedIn.set(true);
      return true;
    }
    return false;
  }

  logout() {
    this._loggedIn.set(false);
  }
}