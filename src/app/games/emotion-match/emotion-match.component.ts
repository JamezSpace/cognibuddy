import { Component } from '@angular/core';
import { EmotionCard } from '../../interfaces/emotion-card.interface';

@Component({
    selector: 'emotion-match',
    imports: [],
    templateUrl: './emotion-match.component.html',
    styleUrl: './emotion-match.component.css'
})
export class EmotionMatchComponent {
    emotions = [
        { label: 'Happy', emoji: '😊' },
        { label: 'Sad', emoji: '😢' },
        { label: 'Angry', emoji: '😡' },
        { label: 'Surprised', emoji: '😲' },
        { label: 'Scared', emoji: '😨' }
    ];

    cards: EmotionCard[] = [];
    flippedCards: EmotionCard[] = [];
    matches = 0;
    attempts = 0;
    score = 0;
    completed = false;

    ngOnInit() {
        this.setupGame();
    }

    setupGame() {
        const labelCards = this.emotions.map((e, index) => ({
            id: index,
            label: e.label,
            type: 'label' as const,
            value: e.label,
            matched: false,
            flipped: false
        }));

        const imageCards = this.emotions.map((e, index) => ({
            id: index,
            label: e.label,
            type: 'image' as const,
            value: e.emoji,
            matched: false,
            flipped: false
        }));

        this.cards = [...labelCards, ...imageCards].sort(() => 0.5 - Math.random());
        this.matches = 0;
        this.attempts = 0;
        this.score = 0;
        this.completed = false;
        this.flippedCards = [];
    }

    flipCard(card: EmotionCard) {
        if (card.flipped || card.matched || this.flippedCards.length >= 2) return;

        card.flipped = true;
        this.flippedCards.push(card);

        if (this.flippedCards.length === 2) {
            this.attempts++;
            const [first, second] = this.flippedCards;
            if (first.label === second.label && first.type !== second.type) {
                first.matched = second.matched = true;
                this.matches++;
                this.flippedCards = [];

                if (this.matches === this.emotions.length) {
                    this.calculateScore();
                    this.completed = true;
                }
            } else {
                setTimeout(() => {
                    first.flipped = false;
                    second.flipped = false;
                    this.flippedCards = [];
                }, 1000);
            }
        }
    }

    calculateScore() {
        this.score = Math.round((this.matches / this.attempts) * 100);
    }

    resetGame() {
        this.setupGame();
    }
}
