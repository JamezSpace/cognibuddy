import { Component } from '@angular/core';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { RoundedSquareComponent } from "../../components/rounded-square/rounded-square.component";
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-parent',
  imports: [NavBarComponent, RoundedSquareComponent, MatProgressBarModule],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css'
})
export class ParentComponent {

}
