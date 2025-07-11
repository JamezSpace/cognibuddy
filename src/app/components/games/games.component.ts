import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { PlayGameComponent } from '../play-game/play-game.component';
import { routes } from '../../app.routes';

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

    readonly dialog = inject(MatDialog);
    
    openDialog(route: String): void {
        const dialogRef = this.dialog.open(PlayGameComponent, {
            data: { route },
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

}
