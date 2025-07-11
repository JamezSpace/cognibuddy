import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminDashboardService } from '../../services/admin/admin-dashboard.service';
import { ParentDashboardService } from '../../services/parent/parent-dashboard.service';
import { Child } from '../../interfaces/child.interface';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';


interface ChildWithPin extends Child {
    newPin: string;
}

@Component({
    selector: 'parent-edit-child',
    imports: [MatInputModule, ReactiveFormsModule],
    templateUrl: './parent-edit-child.component.html',
    styleUrl: './parent-edit-child.component.css',
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
    ]
})
export class ParentEditChildComponent implements OnInit {
    constructor(
        private parentDashboardService: ParentDashboardService,
        @Inject(MAT_DIALOG_DATA) child: ChildWithPin) {
        this.child.set(child)
    }

    readonly data = inject<Child>(MAT_DIALOG_DATA);
    readonly dialogRef = inject(MatDialogRef<ParentEditChildComponent>);

    onNoClick(): void {
        this.dialogRef.close();
    }

    child = signal<ChildWithPin | null>(null);
    editChildForm!: FormGroup;

    ngOnInit(): void {
        this.editChildForm = new FormGroup({
            name: new FormControl(this.child()?.name, Validators.required),
            newPin: new FormControl(this.child()?.newPin, Validators.required)
        })
    }

    async editChild() {
        try {
            await this.parentDashboardService.editChild({...this.editChildForm.value, _id: this.child()?._id});
            console.log(`Child ${this.data.name} edited successfully`);
            this.cancel()
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }

    cancel() {
        this.dialogRef.close();
    }
}
