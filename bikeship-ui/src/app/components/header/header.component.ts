import { Component } from '@angular/core';

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  navClosed = false;

  closeMobileNav() {
    if (!this.navClosed) {
    document.getElementById('navbar')!.style.display = 'none';
    document.getElementById('mobileNavCloser')!.style.rotate = '180deg';
    this.navClosed = true;
    } else {
      document.getElementById('navbar')!.style.display = 'block';
      document.getElementById('mobileNavCloser')!.style.rotate = '0deg';
      this.navClosed = false;
    }
  }
}
