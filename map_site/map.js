import Feature from '../node_modules/ol/Feature.js';
import OSM from '../node_modules/ol/source/OSM.js';
import Map from '../node_modules/ol/Map.js';
import Point from '../node_modules/ol/geom/Point.js';
import View from '../node_modules/ol/View.js';
import { Icon, Style } from '../node_modules/ol/style.js';
import { Tile as TileLayer, Vector as VectorLayer } from '../node_modules/ol/layer.js';
import { fromLonLat } from '../node_modules/ol/proj.js';
import {Vector as VectorSource} from '../node_modules/ol/source.js';


const vectorSource = new VectorSource({
    features: [],
});


function loadMap() {
    let StartCoordinates = [16.378500, 48.173950];

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

// Array of markers with coordinates
const markers = [
    { lon: 16.378500, lat: 48.173950 },
    // Add more markers here...
];

// Function to create and add markers to the map
function addMarkersToMap() {
    markers.forEach(marker => {
        const lonLat = fromLonLat([marker.lon, marker.lat]);

        // Create a new feature
        const iconFeature = new Feature({
            geometry: new Point(lonLat),
            name: 'Bikertreff',
        });

        // Style the new feature
        const iconStyle = new Style({
            image: new Icon({
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: 'https://www.pngall.com/wp-content/uploads/2017/05/Map-Marker-Free-Download-PNG.png',
            }),
        });

        iconFeature.setStyle(iconStyle);

        // Add feature to vector source
        vectorSource.addFeature(iconFeature);
        console.log(vectorSource.getFeatures());
    });
}

// Call the function to add markers to the map
addMarkersToMap();
window.onload = loadMap();
export default Map;

// https://www.youtube.com/watch?v=XUCDqzoUh6Y&list=PLSWT7gmk_6LrvfkAFzfBpNckEsaF7S2GB&index=10
// Functions to try:
// map.addLayer();
// map.foreachfeatureatpixels();