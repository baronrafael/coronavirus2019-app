import { Component, OnInit, ViewChild } from '@angular/core';
import { MapComponent as MapGLComponent } from 'ngx-mapbox-gl';
import { Map } from 'mapbox-gl';
import { MapLayerManagerService } from '../../services/map-layer-manager.service';
import { filter, switchMap } from 'rxjs/operators';
import { LayerNames, MapInfoLayer } from '@core/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  private position: Position;
  style = 'mapbox://styles/alessandrojcm/ck82fo7fu50j81ipckt4kyq3l';
  zoom = 2;

  @ViewChild(MapComponent) mapComponent!: MapGLComponent;

  private map: Map;
  activeLayer$: Observable<MapInfoLayer>;

  constructor(private layerManager: MapLayerManagerService) {}

  ngOnInit(): void {
    if (navigator.geolocation) {
      console.log('🗺️ yep, we can find u! 😃');
      navigator.geolocation.getCurrentPosition((pos) => {
        this.position = pos;
      });
    } else {
      console.log("Can't find u with navigator.geolocation 😞");
    }
    this.activeLayer$ = this.layerManager.isReady$.pipe(
      filter((res) => res),
      switchMap(() => this.layerManager.getMapLayer$(LayerNames.INFECTED)),
    );
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
