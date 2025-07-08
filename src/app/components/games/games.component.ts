import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'games',
    imports: [RouterModule],
    templateUrl: './games.component.html',
    styleUrl: './games.component.css'
})
export class GamesComponent {
    games = [
        { 
            name: 'Memory Game', 
            route: 'games/memory-game', 
            img: 'memory.jpg', 
            description: 'Play games that challenge your mind and improve cognitive skills.' 
        },
        { 
            name: 'Number Trail', 
            route: 'games/number-trail', 
            img: 'number.png', 
            description: 'Test your math skills in a fun way!' 
        },
        { 
            name: 'Emotion Match', 
            route: 'games/emotion-match', 
            img: 'emotion.jpg', 
            description: 'Learn about emotions by matching them with faces.' 
        }
    ];
}
