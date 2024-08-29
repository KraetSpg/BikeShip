import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Map, MapBrowserEvent, View } from 'ol';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import Link from 'ol/interaction/Link';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Overlay from 'ol/Overlay.js';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style.js';
import { MapService } from '../../services/map/map.service';
import { ReactiveFormsModule } from '@angular/forms';
import { resolve } from 'node:path';
import { BikerMeetup } from '../../interfaces/BikerMeetup';
import { Coordinate } from 'ol/coordinate';


@Component({
  selector: 'app-map-component',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
  providers: [MapService]
})
export class MapKomponent implements OnInit {

  private mapService = inject(MapService)
  public map!: Map;
  public bindedDisplayAddMarkerFunction = this.displayAddMarker.bind(this);
  public popupForm = new FormGroup({
    name: new FormControl(''),
    startzeit: new FormControl(''),
    beschreibung: new FormControl('')
  })

  popup = new Overlay({
    autoPan: {
      animation: {
        duration: 250,
      },
    },
  });

  //used to store features
  addIconSource = new VectorSource({
  });

  //used to display all meetups
  meetupIconSource = new VectorSource({
  });

  //Layer that gets added to the Map
  featureLayer = new VectorLayer({
    source: this.addIconSource
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
        center: fromLonLat([16.37381890, 48.20817430]),
        zoom: 10,
      }),
    });

    this.map.addLayer(this.featureLayer);
    this.map.addInteraction(new Link());

    let popupElement = document.getElementById('popup')!;
    this.popup.setElement(popupElement)

    this.displayBikerMeetups();
  };

  public selectViewMode() {
    document.getElementById('plus')?.classList.add("opacity-50")
    document.getElementById('eye')?.classList.remove("opacity-50")

    this.cleanUpMap();
  }

  public selectAddMode() {
    document.getElementById('eye')?.classList.add("opacity-50")
    document.getElementById('plus')?.classList.remove("opacity-50")

    this.map.on("singleclick", this.bindedDisplayAddMarkerFunction)
  }

  displayAddMarker(event: MapBrowserEvent<UIEvent>) {
    this.addIconSource.clear();
    let coordinates = event.coordinate;
    this.popup.setPosition(coordinates); // Show the form

    let feature = new Feature({
      geometry: new Point(coordinates),
      name: 'Bikertreff',
    })

    const iconStyle = new Style({
      image: new Icon({
        scale: 0.08,
        anchor: [0.5, 800],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'https://raw.githubusercontent.com/KraetSpg/BikeShip_Magenta/cd424e00df54f2a488959a7458d08f0921f69dd2/bikeship-ui/public/neues_feature.svg',
      }),
    });
    feature.setStyle(iconStyle);
    this.addIconSource.addFeature(feature); // Display Icon on the Map
  }

  cleanUpMap() {
    this.map.un("singleclick", this.bindedDisplayAddMarkerFunction);
    this.popup.setPosition(undefined);
    this.addIconSource.clear();
  }

  collectPopupDataAndPost() {
    let formData = this.popupForm.value;
    let coordinates = this.popup.getPosition();

    //Not the best solution should check in HTML with Angular
    if (coordinates != null && formData.name != null && formData.startzeit != null && formData.beschreibung != null) {
      this.mapService.postBikerMeetUp(coordinates, formData.name, formData.startzeit, formData.beschreibung)
        .then((responseValue) => {
          if (responseValue != null) {
            alert("Successfully created") // Lets do a MessageService for this
          } else {
            alert("Error")
          }
        })
    } else {
      throw new Error("Some Values are missing")
    }
  }

  displayBikerMeetups() {
    this.mapService.getBikerMeetupsFromBackend()
    .then((bikermeetups: BikerMeetup[]) => {
      for (let i = 0; i < bikermeetups.length; i++) {
        let meetUp = bikermeetups[i];
      }
    })
  }

  displayMeetUpMarker(coordinates: Coordinate, name: string, date: string, desc: string, created_on: string) {

    let feature = new Feature({
      geometry: new Point(coordinates),
      name: name,
      date: date,
      desc: desc,
      created_on: created_on,
    })

    const iconStyle = new Style({
      image: new Icon({
        scale: 0.08,
        anchor: [0.5, 800],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'https://raw.githubusercontent.com/KraetSpg/BikeShip_Magenta/cd424e00df54f2a488959a7458d08f0921f69dd2/bikeship-ui/public/neues_feature.svg',
      }),
    });
    feature.setStyle(iconStyle);
    this.meetupIconSource.addFeature(feature); // Display Icon on the Map
  }
}
