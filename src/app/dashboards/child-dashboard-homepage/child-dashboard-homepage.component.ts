import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChildDashboardService } from '../../services/child/child-dashboard.service';
import { environment } from '../../../environments/environment';
import { GameHistory, GameSummary } from '../../interfaces/games.interface';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
    selector: 'child-dashboard-homepage',
    imports: [RouterModule],
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

    games = [
        { name: 'Memory Game', route: 'games/memory-game', img: 'memory.jpg', description: 'Play games that challenge your mind and improve cognitive skills.' },
        { name: 'Number Trail', route: 'games/number-trail', img: 'number.png', description: 'Test your math skills in a fun way!' },
        { name: 'Emotion Match', route: 'games/emotion-match', img: 'emotion.jpg', description: 'Learn about emotions by matching them with faces.' }
    ];

    summaries: GameSummary[] = [];

    async ngOnInit() {
        await this.fetchGameSummary();
    }

    async fetchGameSummary() {
        try {
            const res = await fetch(`${environment.backend.base_url}/games/summary`, {
                headers: { Authorization: `Bearer ${this.access_token}` }
            });

            const result = await res.json();
            if (result.status === 'success') {
                this.summaries = result.data;
            }
        } catch (err) {
            console.error('Failed to fetch summary', err);
        }
    }
}
