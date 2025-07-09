import { Component, signal } from '@angular/core';
import { AdminDashboardService } from '../../services/admin/admin-dashboard.service';
import { User } from '../../interfaces/users.interface';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'admin-home',
    imports: [FormsModule],
    templateUrl: './admin-home.component.html',
    styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {
    constructor(private adminService: AdminDashboardService) { }

    users = signal<User[]>([]);

    ngOnInit() {
        this.loadUsers();
    }

    async loadUsers() {
        const data = await this.adminService.getAllUsers();

        this.users.set(data);
    }

    searchTerm = signal('');
    selectedRole = signal('');

    async filterUsers() {
        const users = await this.adminService.getFilteredUsers(
            this.searchTerm(),
            this.selectedRole()
        );
        this.users.set(users);
    }
}
