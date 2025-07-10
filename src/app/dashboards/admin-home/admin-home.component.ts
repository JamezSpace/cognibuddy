import { Component, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AdminDashboardService } from '../../services/admin/admin-dashboard.service';
import { User } from '../../interfaces/users.interface';
import { FormsModule } from '@angular/forms';
import { AdminEditUserComponent } from '../../components/admin-edit-user/admin-edit-user.component';
import { DeletePersonComponent } from '../../components/delete-person/delete-person.component';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
    selector: 'admin-home',
    imports: [FormsModule, MatIconModule, MatMenuModule],
    templateUrl: './admin-home.component.html',
    styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {
    constructor(private adminService: AdminDashboardService, private dialog: MatDialog) { }

    users = signal<User[]>([]);
    // filteredUsers = signal<User[]>([]);
    filteredUsers = signal<User[]>([
        {
            _id: '2',
            name: "jamnx",
            role: 'admin',
            age: 89,
            createdAt: new Date().toISOString(),
            email: "sam@abk",
            verified: true
        }
    ]);

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

    editUser(user: User) {
        const dialogRef = this.dialog.open(AdminEditUserComponent, {
            data: user,
        });

        dialogRef.afterClosed().subscribe(updatedData => {
            if (updatedData) {
                this.adminService.updateUser(user._id, updatedData);
            }
        });
    }

    deleteUser(user: User) {
        const dialogRef = this.dialog.open(DeletePersonComponent, {
            data: { ...user, triggerRole: 'admin' },
        });

        dialogRef.afterClosed().subscribe(deletedData => {
            if (deletedData) {
                this.adminService.updateUser(user._id, deletedData);
            }
        });
    }

    exportToPDF() {
        const doc = new jsPDF();

        // Title
        doc.setFontSize(16);
        doc.text('User Report', 14, 20);

        // Table headers and rows
        const head = [['id','Name', 'Email', 'Role', 'Parent id']];
        const body = this.filteredUsers().map(user => [
            user._id,
            user.name,
            user.email || '-',
            user.role,
            user.parent_id || '-'
        ]);

        autoTable(doc, {
            head,
            body,
            startY: 30
        });

        doc.save('autism-project-users-report.pdf');
    }

}
