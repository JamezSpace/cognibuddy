import { Component, OnInit, signal } from '@angular/core';
import { RoundedSquareComponent } from "../../components/rounded-square/rounded-square.component";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ParentDashboardService } from '../../services/parent/parent-dashboard.service';
import { ChildGameProgress } from '../../interfaces/games.interface';

@Component({
    selector: 'parent-overview',
    imports: [RoundedSquareComponent, MatProgressBarModule],
    templateUrl: './parent-overview.component.html',
    styleUrl: './parent-overview.component.css'
})
export class ParentOverviewComponent implements OnInit {
    private username = localStorage.getItem('user_name');
    private user_id = localStorage.getItem('user_id');
    progressData = signal<ChildGameProgress[]>([]);

    get name(): string {
        return this.username || '';
    }

    constructor(private parentDashboardService: ParentDashboardService) { }

    get children() {
        return this.parentDashboardService.children();
    }

    async ngOnInit() {
        await this.parentDashboardService.fetchChildren();
        const result = await this.parentDashboardService.getProgressSummary();
        this.progressData.set(result);
    }

    get totalGamesPlayed(): number {
        return this.children.reduce((total, child) => total + (child.games_played || 0), 0);
    }

    get badgesEarned(): number {
        return this.children.reduce((total, child) => total + (child.badges ? child.badges.length : 0), 0);
    }

    // get minutesToday(): number {
    //     return this.children.reduce((total, child) => total + (child.minutes_today || 0), 0);
    // }
    
}
