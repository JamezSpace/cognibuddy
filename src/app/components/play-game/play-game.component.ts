import { Component, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'play-game',
  imports: [RouterModule],
  templateUrl: './play-game.component.html',
  styleUrl: './play-game.component.css'
})
export class PlayGameComponent {
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

    constructor(
        private dialogRef: MatDialogRef<PlayGameComponent>,
        @Inject(MAT_DIALOG_DATA) route: String
    ) {
        console.log(route);
    }


}
