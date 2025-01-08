import { Component } from '@angular/core';
import { CategoryscrollerComponent } from './categoryscroller/categoryscroller.component';

@Component({
  selector: 'app-bikerpage',
  standalone: true,
  imports: [
    CategoryscrollerComponent
  ],
  templateUrl: './bikerpage.component.html',
  styleUrl: './bikerpage.component.css'
})
export class BikerpageComponent {

}
