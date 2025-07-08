import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChildDashboardService } from '../../services/child/child-dashboard.service';
import { environment } from '../../../environments/environment';
import { GameHistory, GameSummary } from '../../interfaces/games.interface';
import { ChartConfiguration, ChartType } from 'chart.js';
import { GamesComponent } from "../../components/games/games.component";

@Component({
    selector: 'child-dashboard-homepage',
    imports: [RouterModule, GamesComponent],
    templateUrl: './child-dashboard-homepage.component.html',
    styleUrl: './child-dashboard-homepage.component.css'
})
export class ChildDashboardHomepageComponent implements OnInit {
    private childDashboardService: ChildDashboardService;
    private access_token: string | null = localStorage.getItem('access_token');
    constructor(childDashboardService: ChildDashboardService) {
        this.childDashboardService = childDashboardService;
    }

    get username(): string {
        return this.childDashboardService.username;
    }

    get _id(): string {
        return this.childDashboardService._id;
    }

    summaries = signal<GameSummary[]>([]);

    async ngOnInit() {
        await this.fetchGameSummary();
    }

    async fetchGameSummary() {
        try {
            const res = await fetch(`${environment.backend.base_url}/games/summary`, {
                headers: { Authorization: `Bearer ${this.access_token}` }
            });

            const result = await res.json();
            console.log("game data", result);
            
            if (result.status === 'success') {
                this.summaries.set(result.data);
            }
        } catch (err) {
            console.error('Failed to fetch summary', err);
        }
    }
}
