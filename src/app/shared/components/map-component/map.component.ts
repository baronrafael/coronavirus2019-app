import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { environment } from '@environments/environment';
import { MapComponent as MapGLComponent } from 'ngx-mapbox-gl';
import { Map, MapboxGeoJSONFeature, Style } from 'mapbox-gl';
import { MapInfoLayer } from '@core/models';
import flatten from 'lodash.flatten';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit, OnChanges {
  private position: Position;
  private map: Map;
  private countryFeatures: MapboxGeoJSONFeature[] = [];

  // The following properties are Mapbox Specific, for more information
  // check out their documentation on layouts, painting and styles
  // https://docs.mapbox.com/mapbox-gl-js/style-spec/
  // https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/
  // https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/

  // Expression filters to determine color
  private hoverFilter: (string | number)[] = ['==', 'id', ''];
  private layerColorFilter: (string | string[] | number | number[])[] = [
    'match',
    ['get', 'A3'],
    [''],
    environment.mapFillColor,
    environment.mapFillColor,
  ];
  private layerOpacityFilter: (string | string[] | number | number[])[] = [
    'match',
    ['get', 'A3'],
    [''],
    1,
    1,
  ];

  // Root style of the map
  style: Style = {
    name: 'root',
    version: 8,
    glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
    sources: {
      admin: {
        type: 'vector',
        url: 'mapbox://mapbox.mapbox-streets-v8',
      },
    },
    layers: [
      {
        id: 'background',
        type: 'background',
        paint: {
          'background-color': environment.mapBackgroundColor,
        },
      },
    ],
  };

  // Expressions and properties for countries
  countriesBorders = ['match', ['get', 'admin_level'], [0], 1, 0];
  countriesBorderPaint = {
    'line-color': environment.mapBackgroundColor,
    'line-opacity': this.countriesBorders,
  };
  countriesLabel = [
    'match',
    ['get', 'class'],
    ['country', 'disputed_country'],
    true,
    false,
  ];

  // Expressions and properties for countries's names
  labelsFilter = ['to-string', ['get', 'name_en']];
  textFont = ['Roboto Medium', 'Arial Unicode MS Regular'];
  labelsLayout = {
    'text-font': this.textFont,
    'text-size': 16,
    'text-field': this.labelsFilter,
  };
  labelsPaint = {
    'text-color': environment.mapBackgroundColor,
    'text-opacity': 1,
    'text-halo-color': environment.mapFillColor,
    'text-halo-blur': 2,
    'text-halo-width': 1,
  };

  zoom = 2;
  data = environment.mapBox.geoJsonSource;

  @ViewChild(MapComponent) mapComponent!: MapGLComponent;

  @Input() activeLayer: MapInfoLayer;

  constructor() {}

  ngOnInit(): void {
    if (navigator.geolocation) {
      console.log('🗺️ yep, we can find u! 😃');
      navigator.geolocation.getCurrentPosition((pos) => {
        this.geolocate(pos);
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
    this.map.resize();
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

  get fillColor() {
    return this.layerColorFilter;
  }

  get opacityLevel() {
    return this.layerOpacityFilter;
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

    this.layerColorFilter = [
      'match',
      ['get', 'A3'],
      ['', ...allCodes],
      this.activeLayer.color,
      environment.mapFillColor,
    ];
    this.layerOpacityFilter = [...this.constructFillOpacityExpression(), 1];
    this.map.setPaintProperty('countries-fill', 'fill-opacity', 0);
  }

  private removeFeaturePaint() {
    this.layerColorFilter = [
      'match',
      ['get', 'A3'],
      [''],
      environment.mapFillColor,
      environment.mapFillColor,
    ];
    this.layerOpacityFilter = ['match', ['get', 'A3'], [''], 1, 1];
    this.map.setPaintProperty('countries-fill', 'fill-opacity', 1);
  }

  private constructFillOpacityExpression() {
    const sanitizeData = this.activeLayer.featureLayers
      .map(({ alpha3Codes, alpha }) => {
        const filtered = alpha3Codes.filter(Boolean);
        // We don't wan empty country data since it makes Mapbox match explode
        if (filtered.length === 0) {
          return null;
        }

        return {
          alpha3Codes: filtered,
          alpha,
        };
      })
      .filter(Boolean);
    return sanitizeData.reduce<Array<string[] | string | number>>(
      (prev, curr) => [...prev, curr.alpha3Codes, curr.alpha],
      ['match', ['get', 'A3']],
    );
  }
}
