import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ChildDashboardService {

    constructor() { }

    readonly username: string = localStorage.getItem('user_name') || 'Child';
    readonly _id: string = localStorage.getItem('user_id') || '';

    
}
