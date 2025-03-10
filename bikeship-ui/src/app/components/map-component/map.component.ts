import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Map, MapBrowserEvent, View } from 'ol';
import { Coordinate } from 'ol/coordinate';
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
import { BikerMeetup } from '../../interfaces/BikerMeetup';
import { MapService } from '../../services/map/map.service';

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

  public bindedDisplayAddMarkerFunction = this.displayAddPopUp.bind(this);
  public bindedDisplayViewPopup = this.displayViewPopup.bind(this);
  public addPopupForm = new FormGroup({
    name: new FormControl(''),
    startzeit: new FormControl(''),
    beschreibung: new FormControl('')
  })
  public viewPopupForm = new FormGroup({
    name: new FormControl(''),
    startzeit: new FormControl(''),
    beschreibung: new FormControl('')
  })

  addPopup = new Overlay({
    autoPan: {
      animation: {
        duration: 250,
      },
    },
  });
  
  viewPopup = new Overlay({
    autoPan: {
      animation: {
        duration: 250,
      },
    },
  });

  //used to store features
  addMeetUpSource = new VectorSource({
  });

  addMeetupLayer = new VectorLayer({
    source: this.addMeetUpSource
  })

  //used to display all meetups
  meetupIconSource = new VectorSource({
  });

  meetUpLayer = new VectorLayer({
    source: this.meetupIconSource
  })

  ngOnInit(): void {
    this.map = new Map({
      overlays: [this.addPopup, this.viewPopup],
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
      controls: [],
    });

    this.map.addLayer(this.addMeetupLayer); // Add Layer for Add Mode
    this.map.addLayer(this.meetUpLayer); // Add Layer where Meetups get displayed
    this.map.addInteraction(new Link());

    let addPopupElement = document.getElementById('addPopup')!;
    this.addPopup.setElement(addPopupElement);
    
    let viewPopupElement = document.getElementById('viewPopup')!;
    this.viewPopup.setElement(viewPopupElement);

    this.displayBikerMeetups(); // Display all Meetups
    this.selectViewMode(); // Default View Mode
  };

  public selectViewMode() {
    document.getElementById('plus')?.classList.add("opacity-50")
    document.getElementById('eye')?.classList.remove("opacity-50")

    this.cleanUpMap();
    this.map.on("pointermove", this.bindedDisplayViewPopup);  // Add function to Show MeetUp on Hover
  }

  public selectAddMode() {
    document.getElementById('eye')?.classList.add("opacity-50")
    document.getElementById('plus')?.classList.remove("opacity-50")

    this.cleanUpMap();
    this.map.on("singleclick", this.bindedDisplayAddMarkerFunction)
  }

  displayViewPopup(event: MapBrowserEvent<UIEvent>) {
    // If no feature hovered hide popup
    if (this.map.getFeaturesAtPixel(event.pixel).length == 0) {
      this.viewPopup.setPosition(undefined);
      return;
    } 
    this.map.forEachFeatureAtPixel(event.pixel, (feature) => {
      let name = feature.get("name");
      let date = feature.get("date");
      let desc = feature.get("desc");
      let created_on = feature.get("created_on").split("T")[0];
      let created_by = feature.get("created_by");
      let coordinates: Coordinate = feature.getProperties()['geometry'].flatCoordinates;


      document.getElementById('userCreated')!.innerText = created_by || "No Data";
      document.getElementById('dateCreated')!.innerText = created_on || "No Data";
  
      this.viewPopup.setPosition(coordinates);
      this.viewPopupForm.setValue({
        name: name,
        startzeit: date,
        beschreibung: desc,
      })
    })
  }

  displayAddPopUp(event: MapBrowserEvent<UIEvent>) {
    this.addMeetUpSource.clear();
    let coordinates = event.coordinate;
    this.addPopup.setPosition(coordinates); // Show the form

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
        src: '/neues_feature.svg',
      }),
    });
    feature.setStyle(iconStyle);
    this.addMeetUpSource.addFeature(feature); // Display Icon on the Map
  }

  cleanUpMap() {
    this.map.un("pointermove", this.bindedDisplayViewPopup);
    this.map.un("singleclick", this.bindedDisplayAddMarkerFunction);
    this.addPopup.setPosition(undefined);
    this.addMeetUpSource.clear();
  }

  collectPopupDataAndPost() {
    let formData = this.addPopupForm.value;
    let coordinates = this.addPopup.getPosition();

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
    this.mapService.getBikerMeetupsFromNeon()
      .then((bikermeetups: BikerMeetup[]) => {
        for (let i = 0; i < bikermeetups.length; i++) {
          let meetUp = bikermeetups[i];
          this.displayMeetUpMarker([meetUp.xValue, meetUp.yValue], meetUp.name, meetUp.date, meetUp.desc, meetUp.createdAt, meetUp.createdBy)
        }
      })
  }

  displayMeetUpMarker(coordinates: Coordinate, name: string, date: string, desc: string, created_on: string, created_by: string) {
    let feature = new Feature({
      geometry: new Point(coordinates),
      name: name,
      date: date,
      desc: desc,
      created_on: created_on,
      created_by: created_by,
    })

    const iconStyle = new Style({
      image: new Icon({
        scale: 0.08,
        anchor: [0.5, 800],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: '/bikertreffs.svg',
      }),
    });
    feature.setStyle(iconStyle);
    this.meetupIconSource.addFeature(feature); // Display Icon on the Map
  }
}
