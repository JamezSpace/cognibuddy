import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'child-dashboard-homepage',
  imports: [RouterModule],
  templateUrl: './child-dashboard-homepage.component.html',
  styleUrl: './child-dashboard-homepage.component.css'
})
export class ChildDashboardHomepageComponent {
    constructor() { }

    childName: string = 'Child'; // This should be dynamically set based on the logged-in child's profile
}
