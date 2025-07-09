import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ChildDashboardService } from '../../services/child/child-dashboard.service';

@Component({
    selector: 'number-trail',
    imports: [],
    templateUrl: './number-trail.component.html',
    styleUrl: './number-trail.component.css'
})
export class NumberTrailComponent implements OnInit {
    numbers: number[] = [];
    nextNumber = 1;
    startTime: number = 0;
    endTime: number = 0;
    completed = false;
    score = 0;

    constructor(private childDashboardService: ChildDashboardService) { }
    private access_token: string | null = localStorage.getItem('access_token');

    get goBack() {
        return this.childDashboardService.goBack.bind(this.childDashboardService);
    }

    async ngOnInit() {
        const currentGame = 'number-trail';
        const result = await this.childDashboardService.checkGameAccess(currentGame);

        if (!result.allowed) {
            alert(result.reason || 'Access denied.');
            this.childDashboardService.goBack();
            return;
        }

        this.resetGame();
    }

    resetGame() {
        this.numbers = this.shuffleArray([...Array(10).keys()].map(i => i + 1));
        this.nextNumber = 1;
        this.startTime = 0;
        this.endTime = 0;
        this.completed = false;
        this.score = 0;
    }

    shuffleArray(arr: number[]): number[] {
        return arr.sort(() => Math.random() - 0.5);
    }

    onNumberClick(n: number) {
        if (this.completed || n !== this.nextNumber) return;

        if (this.nextNumber === 1) {
            this.startTime = performance.now();
        }

        this.numbers = this.numbers.map(val => (val === n ? -1 : val)); // -1 means tapped
        this.nextNumber++;

        if (this.nextNumber > 10) {
            this.endTime = performance.now();
            this.completed = true;
            this.calculateScore();
        }
    }

    calculateScore() {
        const duration = (this.endTime - this.startTime) / 1000;
        this.score = Math.max(100 - Math.round(duration * 10), 0);
        this.saveGameResult(); // 👈 Save to backend
    }

    async saveGameResult() {
        try {
            await fetch(`${environment.backend.base_url}/games/number-trail`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.access_token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    score: this.score,
                    matches: 10,          // always 10 for number trail
                    attempts: 10,         // same here
                    date_played: new Date()
                })
            });

            console.log('Game result saved');
        } catch (error) {
            console.error('Failed to save result', error);
        }
    }

}
