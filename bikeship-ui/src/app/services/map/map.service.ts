import { Injectable } from "@angular/core";
import { Coordinate } from "ol/coordinate";

@Injectable({  providedIn: 'root'})
export class MapService {

    async getBikerMeetupsFromBackend() {
        let response;
        await fetch("https://innolab.spengergasse.at/schueler/db/30/items/bikermeetups")
          .then(response => response.json())
          .then(bikertreffs => {
            response = bikertreffs;
        })
        return response;
    }

    async postBikerMeetUp(coordinates: Coordinate, name: string, date: string, desc: string) {
        let json;
        await fetch('https://innolab.spengergasse.at/schueler/db/30/items/bikermeetups', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: name,
              xValue: coordinates[0],
              yValue: coordinates[1],
              date: date,
              desc: desc,
            })
          })
        .then(response => response.json())
        .then(jsonA => {json = jsonA;}) 
        return json; 
    }
}