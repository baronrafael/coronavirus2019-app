import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MapComponent as MapGLComponent } from 'ngx-mapbox-gl';
import { Map } from 'mapbox-gl';
import { MapInfoLayer } from '@core/models';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  private position: Position;
  private map: Map;

  style = 'mapbox://styles/alessandrojcm/ck82fo7fu50j81ipckt4kyq3l';
  zoom = 2;

  @ViewChild(MapComponent) mapComponent!: MapGLComponent;

  @Input() activeLayer: MapInfoLayer;

  constructor() {}

  ngOnInit(): void {
    if (navigator.geolocation) {
      console.log('🗺️ yep, we can find u! 😃');
      navigator.geolocation.getCurrentPosition((pos) => {
        this.position = pos;
      });
    } else {
      console.log("Can't find u with navigator.geolocation 😞");
    }
  }

  bindMap(map: Map) {
    this.map = map;
    if (!this.position) {
      return;
    }
    this.zoomToPosition();
  }

  geolocate(pos: Position) {
    this.position = pos;
    this.zoomToPosition();
  }

  get lngLat() {
    return !this.position
      ? null
      : [this.position.coords.longitude, this.position.coords.latitude];
  }

  private zoomToPosition() {
    this.map.setCenter([
      this.position.coords.longitude,
      this.position.coords.latitude,
    ]);
    this.map.zoomTo(9, {
      duration: 3500,
      animate: true,
    });
  }
}
