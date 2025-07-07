import { Component } from '@angular/core';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-child',
  imports: [NavBarComponent, RouterOutlet],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent {

}
