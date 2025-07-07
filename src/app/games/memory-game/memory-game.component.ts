import { Component } from '@angular/core';
import { Card } from '../../interfaces/card.interface';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'memory-game',
    imports: [],
    templateUrl: './memory-game.component.html',
    styleUrl: './memory-game.component.css'
})
export class MemoryGameComponent {
    private access_token = localStorage.getItem('access_token');
    cards: Card[] = [];
    flippedCards: Card[] = [];
    lockBoard = false;
    matches = 0;
    score = 0;
    attempts = 0;

    images = [
        '🍎', '🍌', '🍇', '🍓', '🍍', '🥝'
    ];

    ngOnInit() {
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
        this.attempts++; // ✅ Count every flip

        if (this.flippedCards.length === 2) {
            this.lockBoard = true;
            const [first, second] = this.flippedCards;

            if (first.image === second.image) {
                first.matched = second.matched = true;
                this.matches++;
                this.lockBoard = false;
                this.flippedCards = [];

                if (this.matches === this.images.length) {
                    this.calculateScore();
                    this.saveGameResult();
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
                    child_id: this.childId,
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
    }
}
