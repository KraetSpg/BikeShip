// GEOCODING API KEY: 67782c4742650095568522vcze4e593

import { Component, Inject, inject, OnInit, ViewChild } from '@angular/core';
import { MapService } from '../../../services/map/map.service';
import { Map, MapBrowserEvent, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
import { UserService } from '../../../services/user/user.service';


@Component({
  selector: 'app-profiledisplay',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './profiledisplay.component.html',
  styleUrl: './profiledisplay.component.css',
  providers: [UserService]
})
export class ProfiledisplayComponent implements OnInit{
  // Services
  public map!: Map;
  private userService = inject(UserService);
  
  // Form
  profileForm = new FormGroup({
    userName: new FormControl(''),
    bundesland: new FormControl(''),
    land: new FormControl(''),
    alter: new FormControl(''),
    desc: new FormControl(''),
    marke: new FormControl(''),
    model: new FormControl(''),
  })

  // User Data
  userName = "No data"
  bundesland = "No data";
  land = "No data";
  alter = "No data";
  desc = "No data";

  // Bike Data
  marke = "No data";
  model = "No data";

  ngOnInit(): void {
    this.userService.getUsers().then((data) => {
      if (data != undefined) {
        this.userName = data[0].name;
        this.bundesland = data[0].state ?? "Hier eingeben";
        this.land = data[0].country ?? "Hier eingeben";
        this.alter = data[0].age?.toString() ?? "Hier eingeben";
        this.desc = data[0].userDesc ?? "Hier eingeben";
      }
    })

    let lat = 0;
    let lon = 0;
    // TODO: replace with actual location string
    fetch("https://geocode.maps.co/search?q=" + this.land + "&api_key=67782c4742650095568522vcze4e593").then((response) => response.json())
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

