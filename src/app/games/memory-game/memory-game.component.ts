import { Component, OnInit } from '@angular/core';
import { Card } from '../../interfaces/card.interface';
import { environment } from '../../../environments/environment';
import { ChildDashboardService } from '../../services/child/child-dashboard.service';
import { Router } from '@angular/router';

@Component({
    selector: 'memory-game',
    imports: [],
    templateUrl: './memory-game.component.html',
    styleUrl: './memory-game.component.css'
})
export class MemoryGameComponent implements OnInit {
    private access_token = localStorage.getItem('access_token');
    private childDashboardService: ChildDashboardService

    constructor(childDashboardService: ChildDashboardService) {
        this.childDashboardService = childDashboardService;
    }

    get goBack() {
        return this.childDashboardService.goBack.bind(this.childDashboardService);
    }

    cards: Card[] = [];
    flippedCards: Card[] = [];
    lockBoard = false;
    matches = 0;
    score = 0;
    attempts = 0;
    gameOver = false;

    images = [
        'berry.png',
        'banana.png',
        'tomato.png',
        'watermelon.png',
        'pineapple.png',
        'kiwi.png',
    ];


    async ngOnInit() {
        const currentGame = 'memory';
        const result = await this.childDashboardService.checkGameAccess(currentGame);

        if (!result.allowed) {
            alert(result.reason || 'Access denied.');
            this.childDashboardService.goBack();
            return;
        }


        this.initializeGame();
    }

    initializeGame() {
        const pairedImages = [...this.images, ...this.images];
        this.cards = pairedImages.map((img, index) => ({
            id: index,
            image: img,
            flipped: false,
            matched: false
        })).sort(() => 0.5 - Math.random());
        this.matches = 0;
    }

    flipCard(card: Card) {
        if (this.lockBoard || card.flipped || card.matched) return;

        card.flipped = true;
        this.flippedCards.push(card);
        this.attempts++;

        if (this.flippedCards.length === 2) {
            this.lockBoard = true;
            const [first, second] = this.flippedCards;

            if (first.image === second.image) {
                first.matched = second.matched = true;
                this.matches++;
                this.flippedCards = [];
                this.lockBoard = false;

                if (this.matches === this.images.length) {
                    this.calculateScore();
                    this.gameOver = true;
                    this.saveGameResult(); // if connected to backend
                }
            } else {
                setTimeout(() => {
                    first.flipped = false;
                    second.flipped = false;
                    this.flippedCards = [];
                    this.lockBoard = false;
                }, 1000);
            }
        }
    }

    calculateScore() {
        this.score = Math.round((this.matches / this.attempts) * 100);
    }


    async saveGameResult() {
        try {
            await fetch(`${environment.backend.base_url}/games/memory`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.access_token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    child_id: this.childDashboardService._id,
                    matches: this.matches,
                    attempts: this.attempts,
                    score: this.score,
                    date_played: new Date()
                })
            });
            console.log('Game result saved');
        } catch (error) {
            console.error('Failed to save game:', error);
        }
    }

    resetGame() {
        this.initializeGame();
        this.gameOver = false;
        this.attempts = 0;
        this.score = 0;
    }

}
