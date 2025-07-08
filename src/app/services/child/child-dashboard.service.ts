import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ChildDashboardService {

    constructor(private router: Router) { }

    readonly username: string = localStorage.getItem('user_name') || 'Child';
    readonly _id: string = localStorage.getItem('user_id') || '';

    goBack() {
        this.router.navigate(['/dashboard/child']);
    }
}
