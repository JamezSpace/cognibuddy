import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AddChildComponent } from '../../components/add-child/add-child.component';
import { ParentDashboardService } from '../../services/parent/parent-dashboard.service';
import { DeletePersonComponent } from '../../components/delete-person/delete-person.component';
import { ParentEditChildComponent } from '../../components/parent-edit-child/parent-edit-child.component';

@Component({
    selector: 'my-children',
    imports: [MatIconModule, MatMenuModule],
    templateUrl: './my-children.component.html',
    styleUrl: './my-children.component.css'
})
export class MyChildrenComponent implements OnInit {
    readonly dialog = inject(MatDialog);

    constructor(public parentDashboardService: ParentDashboardService) { }

    get children() {
        return this.parentDashboardService.children();
    }

    async ngOnInit() {
        await this.parentDashboardService.fetchChildren();
    }

    addChildProfile() {
        const dialogRef = this.dialog.open(AddChildComponent);

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
        });
    }

    editChild(child: any): void {
        const dialogRef = this.dialog.open(ParentEditChildComponent, {
            data: {
                _id: child._id,
                name: child.name,
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    deleteChild(child: any): void {
        const dialogRef = this.dialog.open(DeletePersonComponent, {
            data: {
                _id: child._id,
                role: 'child',
                name: child.name,
                triggerRole: 'parent'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }
}
