import { Component, Input } from '@angular/core';

@Component({
  selector: 'rounded-square',
  imports: [],
  templateUrl: './rounded-square.component.html',
  styleUrl: './rounded-square.component.css'
})
export class RoundedSquareComponent {
    @Input() num!: number;
    @Input() description!: string;
}
