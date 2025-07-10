import { User } from '../../interfaces/users.interface';
import { Component, Inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'admin-edit-user',
    imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
    templateUrl: './admin-edit-user.component.html',
    styleUrl: './admin-edit-user.component.css',
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
    ]
})
export class AdminEditUserComponent implements OnInit {
    user = signal<User | null>(null);
    editUserForm!: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<AdminEditUserComponent>,
        @Inject(MAT_DIALOG_DATA) user: User
    ) {
        this.user.set(user);
    }

    ngOnInit(): void {
        this.editUserForm = new FormGroup({
            name: new FormControl(this.user()?.name, Validators.required),
            email: new FormControl(this.user()?.email, Validators.email),
            role: new FormControl(this.user()?.role, Validators.required)
        })
    }

    submit() {
        if (this.editUserForm.valid) {
            this.dialogRef.close(this.editUserForm.value);
        }
    }

    cancel() {
        this.dialogRef.close();
    }
}
