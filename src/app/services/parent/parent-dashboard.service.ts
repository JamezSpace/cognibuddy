import { Injectable, signal, Signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Child } from '../../interfaces/child.interface';

@Injectable({
    providedIn: 'root'
})
export class ParentDashboardService {

    constructor() { }

    children = signal<Child[]>([])
    private accessToken: string = localStorage.getItem('access_token') || '';

    async fetchChildren(): Promise<void> {
        try {
            const response = await fetch(`${environment.backend.base_url}/users/children`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            if (result.status === 'success') {
                this.children.set(result.data);
            } else {
                console.error('Failed to fetch children:', result.message);
            }
        } catch (error) {
            console.error('Error fetching children:', error);
        }
    }


    async addChild(childData: any): Promise<void> {
        try {
            const response = await fetch(`${environment.backend.base_url}/users/children`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.accessToken}`
                },
                body: JSON.stringify(childData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (data.status === 'success') {
                this.children.update(children => [...children, childData]);
            } else {
                console.error('Failed to add child:', data.message);
            }
        } catch (error) {
            console.error('Error submitting child data:', error);
        }
    }

    removeChildFromSignal(childId: string) {
        this.children.update(children =>
            children.filter(child => child._id !== childId)
        );
    }


    async deleteChild(childId: string): Promise<void> {
        try {
            const response = await fetch(`${environment.backend.base_url}/users/children/${childId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Child deleted successfully:', data);
            this.removeChildFromSignal(childId);
        } catch (error) {
            console.error('Error deleting child:', error);
        }
    }

}
