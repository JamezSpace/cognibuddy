import { Component } from '@angular/core';
import { RoundedSquareComponent } from "../../components/rounded-square/rounded-square.component";
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'parent-overview',
  imports: [RoundedSquareComponent, MatProgressBarModule],
  templateUrl: './parent-overview.component.html',
  styleUrl: './parent-overview.component.css'
})
export class ParentOverviewComponent {

}
