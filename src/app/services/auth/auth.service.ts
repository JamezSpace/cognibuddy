import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthBodyInterface } from '../../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private backendUrl = `${environment.backend.base_url}/auth`

  constructor() { }

  // Method to handle user login
  async signUp(data_to_send: AuthBodyInterface) {
    try {
      const response = await fetch(`${this.backendUrl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data_to_send)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('User signed up successfully:', data);
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  }
}
