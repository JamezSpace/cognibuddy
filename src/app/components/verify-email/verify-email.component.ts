import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'verify-email',
    imports: [],
    templateUrl: './verify-email.component.html',
    styleUrl: './verify-email.component.css'
})
export class VerifyEmailComponent implements OnInit {
    message = signal('Verifying your email...');
    verified = false;

    constructor(private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        const token = this.route.snapshot.queryParamMap.get('token');

        if (!token) {
            this.message.set('No verification token provided.');
            return;
        }

        this.verifyEmail(token);
    }

    async verifyEmail(token: string) {
        try {
            const response = await fetch(`${environment.backend.base_url}/auth/verify-email?token=${token}`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Verification failed.');
            }

            const data = await response.json();
            this.message.set(data.message);
            this.verified = true;
        } catch (error: any) {
            this.message.set(error.message || 'An unexpected error occurred.');
        }
    }

    goToLogin() {
        this.router.navigate(['/login']);
    }
}
