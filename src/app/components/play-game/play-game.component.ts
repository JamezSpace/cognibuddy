import { Component, OnInit, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'play-game',
  imports: [RouterModule],
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.css']
})
export class PlayGameComponent implements OnInit {

  constructor(
    private router: Router,
    @Optional() private dialogRef?: MatDialogRef<PlayGameComponent>
  ) {}

  ngOnInit() {
    if (!this.dialogRef) {
      // Abort rendering if not opened via dialog
      this.router.navigate(['/dashboard/child']);
    }
  }
}
