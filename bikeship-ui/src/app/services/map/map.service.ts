import { Injectable } from "@angular/core";
import { Coordinate } from "ol/coordinate";
import { BikerMeetup } from "../../interfaces/BikerMeetup";

@Injectable({  providedIn: 'root'})
export class MapService {

  async sendPostRequest(): Promise<void> {
    let body = {
      name: 'BikerMeetup',
      xValue: 16.3725,
      yValue: 48.2083,
      date: '2021-06-01',
      desc: 'This is a test'
    }
    await fetch('http://localhost:3000/api/bikermeetups', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    }).then(response => console.log(response))
  }

    async getBikerMeetupsFromNeon(): Promise<BikerMeetup[]> {
        let response!: BikerMeetup[];
        await fetch("http://localhost:3000/api/bikermeetups")
          .then( (response) => response.json())
          .then( (bikertreffs) => {
            response = bikertreffs;
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