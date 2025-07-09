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
    filteredUsers = signal<User[]>([]);

    ngOnInit() {
        this.loadUsers();
    }

    async loadUsers() {
        const data = await this.adminService.getAllUsers();

        this.users.set(data);
        this.filteredUsers.set(data)
    }

    searchTerm = signal('');
    selectedRole = signal('');

    filterUsers() {
        const search = this.searchTerm().toLowerCase();
        const role = this.selectedRole();

        const result = this.filteredUsers().filter(user => {
            const matchesRole = !role || user.role === role;
            const matchesSearch = !search || (
                user.name?.toLowerCase().includes(search) ||
                user.email?.toLowerCase().includes(search)
            );
            return matchesRole && matchesSearch;
        });

        this.filteredUsers.set(result);
    }

}
