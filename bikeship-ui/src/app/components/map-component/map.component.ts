import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';

@Component({
  selector: 'app-map-component',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapKomponent implements OnInit {
  title = 'bikeship-ui';

  ngOnInit(): void {

   const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});
  }
}
