import { Component } from '@angular/core';
import { ParentDashboardService } from '../../services/parent/parent-dashboard.service';

@Component({
  selector: 'child-activity-log',
  imports: [],
  templateUrl: './child-activity-log.component.html',
  styleUrl: './child-activity-log.component.css'
})
export class ChildActivityLogComponent {
    constructor(private parentDashboardService: ParentDashboardService) {}

    get activityLog () {
        return this.parentDashboardService.activityLog();
    }
}
