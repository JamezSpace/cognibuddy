import { Component } from '@angular/core';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-parent',
  imports: [NavBarComponent, RouterOutlet],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css'
})
export class ParentComponent {

}
