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
  private lat = -14.5;
  private lng = 40;
  private zoom = 16;

  constructor(@Inject(MAP_CONTAINER_NAME) private containerName: string) {
    this.mapbox.accessToken = environment.mapBoxToken;
  }

  buildMap() {
    this.innerMap = new mapboxgl.Map({
      container: this.containerName,
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]
    });
    this.innerMap.addControl(new mapboxgl.NavigationControl());
  }

  get map() {
    return this.innerMap;
  }
}
