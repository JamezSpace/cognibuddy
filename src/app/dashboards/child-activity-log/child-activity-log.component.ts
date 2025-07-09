import { Component, OnInit } from '@angular/core';
import { ParentDashboardService } from '../../services/parent/parent-dashboard.service';

@Component({
  selector: 'child-activity-log',
  imports: [],
  templateUrl: './child-activity-log.component.html',
  styleUrl: './child-activity-log.component.css'
})
export class ChildActivityLogComponent implements OnInit {
    constructor(private parentDashboardService: ParentDashboardService) {}

    get activityLog () {
        return this.parentDashboardService.activityLog()    
    }

    async ngOnInit(): Promise<void> {
        await this.parentDashboardService.fetchActivityLog();
    }
}
