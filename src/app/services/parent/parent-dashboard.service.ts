import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Child } from '../../interfaces/child.interface';
import { ActivityLog } from '../../interfaces/activity-log.interface';

@Injectable({
    providedIn: 'root'
})
export class ParentDashboardService {

    constructor() { }

    children = signal<Child[]>([])
    activityLog = signal<ActivityLog[]>([]);
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

    async fetchActivityLog(): Promise<void> {
        try {
            const res = await fetch(`${environment.backend.base_url}/dashboard/parent/child-activity-log`, {
                headers: { Authorization: `Bearer ${this.accessToken}` }
            });

            console.log('in here');

            const result = await res.json();
            if (result.status === 'success') {
                this.activityLog.set(result.data);
            }
        } catch (err) {
            console.error('Failed to fetch activity log:', err);
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
                this.children.update(children => [...children, { ...childData, username: data.username }]);
            } else {
                console.error('Failed to add child:', data.message);
            }
        } catch (error) {
            console.error('Error submitting child data:', error);
        }
    }

    async editChild(childData: any): Promise<void> {
        try {
            console.log(childData);

            const response = await fetch(`${environment.backend.base_url}/users/children/${childData._id}`, {
                method: 'PATCH',
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
                this.children.update(children =>
                    children.map(child =>
                        child._id === childData._id
                            ? { ...child, ...childData, username: data.username }
                            : child
                    )
                );
            } else {
                console.error('Failed to edit child:', data.message);
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

    async setGameLimit(childId: string, limitData: { restricted_games: string[]; session_limit: number | null }) {
        const res = await fetch(`${environment.backend.base_url}/limits`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.accessToken}`
            },
            body: JSON.stringify({ child_id: childId, ...limitData })
        });
        return res.json();
    }

    async fetchGameLimit(childId?: string) {
        const url = childId
            ? `${environment.backend.base_url}/games/limits/${childId}`
            : `${environment.backend.base_url}/games/limits`;
        const res = await fetch(url, {
            headers: { Authorization: `Bearer ${this.accessToken}` }
        });
        return res.json();
    }

    async getProgressSummary() {
        try {
            const response = await fetch(`${environment.backend.base_url}/games/parent/children/progress`, {
                headers: { Authorization: `Bearer ${this.accessToken}` }
            })

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json()
            return data
        } catch(error: any) {
            console.error(error);   
        }
    }

}
