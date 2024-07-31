import { Injectable } from "@angular/core";

@Injectable({  providedIn: 'root'})
export class MapService {

    getBikerMeetupsFromBackend() {
        fetch("https://innolab.spengergasse.at/schueler/db/30/items/bikermeetups")
          .then(response => response.json())
          .then(bikertreffs => {
            return bikertreffs;
        })
    }
}