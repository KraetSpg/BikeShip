import { Component } from '@angular/core';
import { ProfiledisplayComponent } from './profiledisplay/profiledisplay.component';

@Component({
  selector: 'app-profilepage',
  standalone: true,
  imports: [
    ProfiledisplayComponent
  ],
  templateUrl: './profilepage.component.html',
  styleUrl: './profilepage.component.css'
})
export class ProfilepageComponent {

}
