import { Injectable } from "@angular/core";
import { Coordinate } from "ol/coordinate";
import { BikerMeetup } from "../../interfaces/BikerMeetup";

@Injectable({  providedIn: 'root'})
export class MapService {

    async getBikerMeetupsFromBackend(): Promise<BikerMeetup[]> {
        let response!: BikerMeetup[];
        await fetch("https://innolab.spengergasse.at/schueler/db/30/items/bikermeetups")
          .then( (response) => response.json())
          .then( (bikertreffs) => {
            response = bikertreffs.data;
        }).catch( (reason) => {
          throw new Error("ERROR" + reason)
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