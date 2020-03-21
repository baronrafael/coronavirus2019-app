import { Inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';

import * as mapboxgl from 'mapbox-gl';

import { MAP_CONTAINER_NAME } from '@shared/models/constant';

// Inspired from: https://medium.com/@mugan86/mapas-en-angular-8-con-mapbox-gl-185b157788af
@Injectable()
export class MapService {
  private mapbox = (mapboxgl as typeof mapboxgl);
  private innerMap: mapboxgl.Map;
  private style = `mapbox://styles/mapbox/streets-v11`;
  private lng;
  private lat;
  private zoom = 9;

  constructor(@Inject(MAP_CONTAINER_NAME) private containerName: string) {
    this.mapbox.accessToken = environment.mapBoxToken;
  }

  findMe(){
    if (navigator.geolocation) {
      console.log("🗺️ yep, we can find u! 😃");
      navigator.geolocation.getCurrentPosition((position) =>{
        this.lng = position.coords.longitude;
        this.lat = position.coords.latitude;
        this.buildMap();
      });
    } else {
      console.log("Can't find u with navigator.geolocation 😞");
    }
  }

  buildMap() {
    this.innerMap = new mapboxgl.Map({
      container: this.containerName,
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]

    });
    this.innerMap.addControl(new mapboxgl.NavigationControl());
    let marker = new mapboxgl.Marker({
      draggable: false
    })
    .setLngLat([this.lng, this.lat])
    .addTo(this.innerMap);
  }

  get map() {
    return this.innerMap;
  }


}
