import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'auth-status',
    imports: [],
    templateUrl: './auth-status.component.html',
    styleUrl: './auth-status.component.css'
})
export class AuthStatusComponent {

    constructor(private router: Router) { }
    goToLogin() {
        this.router.navigate(['/login']);
    }
}
