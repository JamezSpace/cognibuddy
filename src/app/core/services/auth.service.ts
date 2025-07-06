import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  login(data: any) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  logout() {
    localStorage.removeItem('user');
  }
}
