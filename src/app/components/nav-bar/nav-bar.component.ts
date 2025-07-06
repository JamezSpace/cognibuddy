import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';


interface NavItems {
    label: string;
    route: string;
}

@Component({
    selector: 'app-nav-bar',
    imports: [MatIconModule],
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
    @Input({required: true})
    navs!: NavItems[];

    logout() {
        // Logic to handle logout
        console.log('User logged out');
    }
}
