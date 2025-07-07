import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../environments/environment';


interface NavItems {
    label: string;
    route: string;
}

@Component({
    selector: 'app-nav-bar',
    imports: [MatIconModule, RouterModule],
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
    router = inject(Router);

    @Input({ required: true })
    navs!: NavItems[];

    async logout() {
        // Call backend to clear the refreshToken cookie
        await fetch(`${environment.backend.base_url}/auth/logout`, {
            method: 'POST',
            credentials: 'include' 
        });

        localStorage.removeItem('access_token');

        this.router.navigate(['/auth']);
    }

}
