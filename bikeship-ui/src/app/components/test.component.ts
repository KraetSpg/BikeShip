import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-test-component',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit {
  title = 'bikeship-ui';

  ngOnInit(): void {
  }
}
