import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChildDashboardService } from '../../services/child/child-dashboard.service';

@Component({
  selector: 'child-dashboard-homepage',
  imports: [RouterModule],
  templateUrl: './child-dashboard-homepage.component.html',
  styleUrl: './child-dashboard-homepage.component.css'
})
export class ChildDashboardHomepageComponent {
    private childDashboardService: ChildDashboardService;
    constructor(childDashboardService: ChildDashboardService) {
        this.childDashboardService = childDashboardService;
    }

    get username(): string {
        return this.childDashboardService.username;
    }

    get _id(): string {
        return this.childDashboardService._id;
    }

    games = [
        { name: 'Memory Game', route: 'games/memory-game' },
        { name: 'Number Trail', route: 'games/number-trail' },
        { name: 'Emotion Match', route: 'games/emotion-match' }
    ];
}
