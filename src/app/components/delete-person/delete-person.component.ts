import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChildDashboardService } from '../../services/child/child-dashboard.service';
import { ParentDashboardService } from '../../services/parent/parent-dashboard.service';

export interface DialogData {
    person: string; // Type of person, e.g., 'child', 'parent'
    name: string; // Name of the person to be deleted
    id: string; // ID of the person to be deleted
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

    constructor(private parentDashboardService: ParentDashboardService) { }

    readonly data = inject<DialogData>(MAT_DIALOG_DATA);
    readonly dialogRef = inject(MatDialogRef<DeletePersonComponent>);

    onNoClick(): void {
        this.dialogRef.close();
    }

    async deletePerson(): Promise<void> {
        if (this.data.person === 'child') {
            try {
                await this.parentDashboardService.deleteChild(this.data.id);
                console.log(`Child ${this.data.name} deleted successfully`);
            } catch (error) {
                console.error('Error deleting child:', error);
            }
        } else if (this.data.person === 'parent') {
            // Logic to delete parent can be added here
            console.log(`Parent ${this.data.name} deletion logic not implemented yet`);
        }

        this.onNoClick()
    }
}
