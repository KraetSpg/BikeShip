import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Map, View } from 'ol';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Link from 'ol/interaction/Link';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import Feature from 'ol/Feature.js';
import { Icon, Style } from 'ol/style.js';
import Point from 'ol/geom/Point.js';
import Overlay from 'ol/Overlay.js';
import { MapService } from '../../services/map/map.service';

@Component({
  selector: 'app-map-component',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
  providers: [MapService]
})
export class MapKomponent implements OnInit {

  private mapService = inject(MapService)

  //PopUp when clicking
  popup = document.getElementById("popup")!; //The ! at the end says that I am sure that popul is never null
  overlay = new Overlay({
    element: this.popup,
    autoPan: {
      animation: {
        duration: 250,
      },
    },
  });

  //used to store features
  source = new VectorSource({
  });

  //Layer that gets added to the Map
  featureLayer = new VectorLayer({
    source: this.source
  })

  ngOnInit(): void {
      //The map that is displayed (an OpenStreetLayerMap)
    const map = new Map({
    //overlays: [this.overlay],
    target: document.getElementById('map-container')!,
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: fromLonLat([0, 0]),
      zoom: 2,
    }),
  });
    //Stay at same position with refresh
    // this.map.addInteraction(new Link());

    const bikerMeetUps = this.mapService.getBikerMeetupsFromBackend()

    console.log(bikerMeetUps)

    //this.map.addLayer(this.featureLayer)
  }
}
