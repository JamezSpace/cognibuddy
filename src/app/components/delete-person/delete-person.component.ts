import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../interfaces/users.interface';
import { AdminDashboardService } from '../../services/admin/admin-dashboard.service';
import { ParentDashboardService } from '../../services/parent/parent-dashboard.service';

export interface UserWithTriggerRole extends User {
    triggerRole: string;
}

@Component({
    selector: 'delete-person',
    imports: [],
    templateUrl: './delete-person.component.html',
    styleUrl: './delete-person.component.css'
})
export class DeletePersonComponent {
    // This component is used to confirm deletion of a person (child)
    // It can be extended to handle different types of persons if needed

    constructor(
        private parentDashboardService: ParentDashboardService,
        private adminDashboardService: AdminDashboardService) { }

    readonly data = inject<UserWithTriggerRole>(MAT_DIALOG_DATA);
    readonly dialogRef = inject(MatDialogRef<DeletePersonComponent>);

    onNoClick(): void {
        this.dialogRef.close();
    }


    async deletePerson(): Promise<void> {
        if (this.data.triggerRole === 'admin') {
            try {
                await this.adminDashboardService.deleteUser(this.data._id);
                console.log(`User ${this.data.name} deleted successfully`);
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        } else if (this.data.triggerRole === 'parent') {
            try {
                await this.parentDashboardService.deleteChild(this.data._id);
                console.log(`Child ${this.data.name} deleted successfully`);
            } catch (error) {
                console.error('Error deleting child:', error);
            }
        }

        this.onNoClick()
    }
}
