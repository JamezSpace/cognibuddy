import { Component, OnInit } from '@angular/core';
import { GameSummary } from '../../interfaces/games.interface';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'child-progress',
    imports: [],
    templateUrl: './child-progress.component.html',
    styleUrl: './child-progress.component.css'
})
export class ChildProgressComponent implements OnInit {
    totalGames = 0;
    averageScore = 0;
    highestScore = 0;
    activeDays = 0;
    summaries: GameSummary[] = [];
    private access_token = localStorage.getItem('access_token');

    async ngOnInit() {
        try {
            const res = await fetch(`${environment.backend.base_url}/games/summary`, {
                headers: { Authorization: `Bearer ${this.access_token}` }
            });

            const result = await res.json();
            if (result.status === 'success') {
                this.summaries = result.data;
                this.totalGames = this.summaries.reduce((sum, g) => sum + g.timesPlayed, 0);
                this.averageScore = Math.round(
                    this.summaries.reduce((sum, g) => sum + g.averageScore, 0) / this.summaries.length
                );
                this.highestScore = Math.max(...this.summaries.map(g => g.bestScore));
            }
        } catch (err) {
            console.error('Error loading progress:', err);
        }
    }
}
