import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ParentDashboardService } from '../../services/parent/parent-dashboard.service';

@Component({
    selector: 'add-child',
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
    templateUrl: './add-child.component.html',
    styleUrl: './add-child.component.css',
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
    ]
})
export class AddChildComponent {

    constructor(private parentDashboardService: ParentDashboardService) {}
    
    readonly dialogRef = inject(MatDialogRef<AddChildComponent>);

    onNoClick(): void {
        this.dialogRef.close();
    }

    pinMatch = signal(true);

    addChildForm = new FormGroup({
        full_name: new FormControl('', Validators.required),
        pin: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}$/)]),
        confirm_pin: new FormControl('', Validators.required)
    });

    async submitChild() {
        const { pin, confirm_pin } = this.addChildForm.value;

        if (pin !== confirm_pin) {
            this.pinMatch.set(false);           
            return;
        }

        const childData = {
            name: this.addChildForm.value.full_name,
            pin: this.addChildForm.value.pin,
            role: 'parent'
        };

        // send to backend via service
        const response = await this.parentDashboardService.addChild(childData);
        
        this.onNoClick()
    }

}
