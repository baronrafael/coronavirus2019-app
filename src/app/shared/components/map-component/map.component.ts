import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MapComponent as MapGLComponent } from 'ngx-mapbox-gl';
import { Map, MapboxGeoJSONFeature } from 'mapbox-gl';
import { MapInfoLayer } from '@core/models';
import * as flatten from 'lodash.flatten';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnChanges {
  private position: Position;
  private map: Map;
  private countryFeatures: MapboxGeoJSONFeature[] = [];

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.activeLayer.currentValue && this.map) {
      this.paintFeatures();
    } else if (!changes.activeLayer.currentValue && this.map) {
      this.removeFeaturePaint();
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

  storeCountryFeatures() {
    if (!this.map) {
      return;
    }
    this.countryFeatures = [
      ...this.map.queryRenderedFeatures(undefined, {
        layers: ['countries-landmass'],
      }),
    ];
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

  private paintFeatures() {
    const allCodes = flatten(
      this.activeLayer.featureLayers.map(({ alpha3Codes }) => alpha3Codes),
    ).filter(Boolean);

    this.map.setPaintProperty('countries-landmass', 'fill-color', [
      'match',
      ['get', 'A3'],
      ['', ...allCodes],
      this.activeLayer.color,
      '#000000',
    ]);
    this.map.setPaintProperty('countries-landmass', 'fill-opacity', [
      ...this.constructFillOpacityExpression(),
      1,
    ]);
    this.map.triggerRepaint();
  }

  private removeFeaturePaint() {
    this.map.setPaintProperty('countries-landmass', 'fill-color', '#000');
    this.map.setPaintProperty('countries-landmass', 'fill-opacity', 1);
  }

  private constructFillOpacityExpression() {
    const sanitizeData = this.activeLayer.featureLayers.map(
      ({ alpha3Codes, alpha }) => {
        const filtered = alpha3Codes.filter(Boolean);

        return {
          alpha3Codes: filtered.length > 0 ? filtered : [''],
          alpha,
        };
      },
    );
    return sanitizeData.reduce<Array<string[] | string | number>>(
      (prev, curr) => [...prev, curr.alpha3Codes, curr.alpha],
      ['match', ['get', 'A3']],
    );
  }
}
