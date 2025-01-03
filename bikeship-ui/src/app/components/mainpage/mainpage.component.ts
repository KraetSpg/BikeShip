import { Component, inject, OnInit } from '@angular/core';
import { MapService } from '../../services/map/map.service';

@Component({
  selector: 'app-mainpage',
  standalone: true,
  imports: [],
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.css',
  providers: [MapService]
})
export class MainpageComponent implements OnInit {
  
  ngOnInit(): void {
  }
}
