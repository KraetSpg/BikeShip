import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { EventType, RouterOutlet } from '@angular/router';
import { Map, MapBrowserEvent, MapEvent, View } from 'ol';
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
import { Observable } from 'rxjs';
import { ListenerFunction } from 'ol/events';

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
  public mode = "view";
  public map!: Map;

  popup = new Overlay({
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
    this.map = new Map({
      overlays: [this.popup],
      target: 'map-container',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([16.37381890 ,48.20817430]),
        zoom: 10,
      }),
    });
    this.map.addLayer(this.featureLayer);

    let popupElement = document.getElementById('popup')!;
    this.popup.setElement(popupElement)
  };

  public selectViewMode() {
    document.getElementById('plus')?.classList.remove("bg-slate-400")
    document.getElementById('eye')?.classList.add("bg-slate-400")
    this.mode = "view";

    this.map.un("singleclick", this.addMarker);
    console.log(this.map.getListeners("singleclick"))
  }

  public selectAddMode() {
    document.getElementById('eye')?.classList.remove("bg-slate-400")
    document.getElementById('plus')?.classList.add("bg-slate-400")
    this.mode = "add";

    this.map.on("singleclick", this.addMarker.bind(this))
  }

  addMarker(event: MapBrowserEvent<UIEvent>) {
    let coordinates = event.coordinate;
    this.popup.setPosition(coordinates);

    let feature = new Feature({
      geometry: new Point(coordinates),
      name: 'Bikertreff',
    })
  
    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'public/neues_feature.svg',
      }),
    });
    feature.setStyle(iconStyle);
  
    this.source.addFeature(feature);
  }
}
