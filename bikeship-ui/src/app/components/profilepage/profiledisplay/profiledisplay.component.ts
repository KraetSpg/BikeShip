// GEOCODING API KEY: 67782c4742650095568522vcze4e593

import { Component, inject, OnInit } from '@angular/core';
import { MapService } from '../../../services/map/map.service';
import { Map, MapBrowserEvent, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import { fromLonLat } from 'ol/proj';



@Component({
  selector: 'app-profiledisplay',
  standalone: true,
  imports: [],
  templateUrl: './profiledisplay.component.html',
  styleUrl: './profiledisplay.component.css'
})
export class ProfiledisplayComponent implements OnInit{
  private mapService = inject(MapService)
  public map!: Map;

  ngOnInit(): void {
    let lat = 0;
    let lon = 0;
    // TODO: replace with actual location string
    fetch("https://geocode.maps.co/search?q=" + "california" + "&api_key=67782c4742650095568522vcze4e593").then((response) => response.json())
    .then((data) => {
      lat = data[0].lat;
      lon = data[0].lon;
    }).then(() => {
      this.map = new Map({
        target: 'map',
        controls: [], 
        interactions: [],
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        view: new View({
          center: fromLonLat([lon, lat]),
          zoom: 5
        }),
      })
    })

    
  }
}

