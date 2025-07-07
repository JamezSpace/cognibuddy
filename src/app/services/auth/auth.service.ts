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
            return data
        } catch (error) {
            console.error('Error during sign up:', error);
        }
    }

    async login(data_to_send: AuthBodyInterface) {
        try {
            const response = await fetch(`${this.backendUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'mode': 'no-cors'
                },
                body: JSON.stringify(data_to_send)
            });

            if (response.status === 500) {
                throw new Error(`${response.statusText}`);
            } else if (response.status === 404) {
                return {valid: false, message: 'User not found'};
            } else if (response.status === 401) {
                return {valid: false, message: 'Invalid password'};
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error during login:', error);
        }
    }
}
