import { Component, OnInit } from '@angular/core';
import { EmotionCard } from '../../interfaces/emotion-card.interface';
import { ChildDashboardService } from '../../services/child/child-dashboard.service';

@Component({
    selector: 'emotion-match',
    imports: [],
    templateUrl: './emotion-match.component.html',
    styleUrl: './emotion-match.component.css'
})
export class EmotionMatchComponent implements OnInit {
    constructor(private childDashboardService: ChildDashboardService) { }

    get goBack() {
        return this.childDashboardService.goBack.bind(this.childDashboardService);
    }

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

        function shuffle<T>(array: T[]): T[] {
            return array
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value);
        }

        const shuffledImageCards = shuffle(imageCards);

        this.cards = [];

        for (let i = 0; i < this.emotions.length; i++) {
            this.cards.push(labelCards[i]);  // left column
            this.cards.push(shuffledImageCards[i]);  // right column
        }
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
