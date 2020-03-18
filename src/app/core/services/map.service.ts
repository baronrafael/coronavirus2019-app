import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  
  map: Mapboxgl.Map;

  constructor() {
  }
  buildMap() {
    (Mapboxgl as any).accessToken = environment.mapBoxToken;
    this.map = new Mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-74.5, 40], // LNG, LAT
    zoom: 16
    });
  }
}
