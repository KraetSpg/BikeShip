import Feature from 'ol/Feature.js';
import OSM from 'ol/source/OSM.js';
import Map from 'ol/Map.js';
import Point from 'ol/geom/Point.js';
import View from 'ol/View.js';
import { Icon, Style } from 'ol/style.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { fromLonLat } from 'ol/proj.js';
import {OGCMapTile, Vector as VectorSource} from 'ol/source.js';
import { create } from 'ol/transform';

const vectorSource = new VectorSource({
    features: [],
});

function createMeetUp(lon, lat) {
    // Create a new feature
    const iconFeature = new Feature({
        geometry: new Point([0, 0]),
        name: 'Bikertreff',
    });

    //Style the new feature
    const iconStyle = new Style({
        image: new Icon({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: 'data/icon.png',
        }),
    });

    iconFeature.setStyle(iconStyle);

    // Add feature to layer
    console.log(vectorSource.addFeature(iconFeature))

}





async function loadMap() {
    let StartCoordinates = [16.378500, 48.173950];

    createMeetUp(16.378500, 48.173950);

    // Create a vector layer
    const vectorLayer = new VectorLayer({
        source: vectorSource,
    });

    // Create Raster layer
    const rasterLayer = new TileLayer({
        source: new OSM(),
    });

    // Create view of the map
    const view = new View({
        center: fromLonLat(StartCoordinates),
        zoom: 11,
    });
    //Create the Map that is visible on the page
    const map = new Map({
        target: document.getElementById('map'),
        layers: [rasterLayer, vectorLayer],
        view: view,
    });
}

function getUserLocation() {
    // not Working RN
    navigator.geolocation.getCurrentPosition((position) => {
        return position.coords;
    });
}

loadMap();


