import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../interfaces/users.interface';

@Injectable({
    providedIn: 'root'
})
export class AdminDashboardService {
    constructor() { }

    readonly access_token = localStorage.getItem('access_token') || ''

    async getAllUsers() {
        try {
            const response = await fetch(`${environment.backend.base_url}/admin/users`, {
                headers: { Authorization: `Bearer ${this.access_token}` }
            });
            const reponse_data = await response.json();
            return reponse_data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    async getFilteredUsers(search: string = '', role: string = '') {
        const query = new URLSearchParams();
        if (search) query.append('search', search);
        if (role) query.append('role', role);

        try {
            const response = await fetch(`${environment.backend.base_url}/admin/users?${query}`, {
                headers: { Authorization: `Bearer ${this.access_token}` }
            });
            const res = await response.json();
            return res.data;
        } catch (error) {
            console.error('Error fetching filtered users:', error);
            throw error;
        }
    }

    async updateUser(id: string, data: Partial<User>) {
        try {
            const response = await fetch(`${environment.backend.base_url}/admin/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.access_token}`
                },
                body: JSON.stringify(data)
            })

            const response_data = await response.json()
            return response_data
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteUser(id: string) {
        try {
            const response = await fetch(`${environment.backend.base_url}/admin/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.access_token}`
                }
            })

            const response_data = await response.json()
            return response_data
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
