import { Injectable } from '@angular/core';
import {
  ColorConfig,
  LayerCountryInfo,
  LayerNames,
  MapInfoLayer,
  MapInfoLayers,
  MapLayerConfig,
  TresholdConfig,
} from '@core/models';
import { MapboxDatasetService, NovelcovidService } from '@core/services';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { environment } from '@environments/environment';
import {
  LAYER_COLORS,
  MAP_LAYERS_TRESHOLD_CONFIG,
} from '@shared/config/layers-config';
import { ISO3166ConverterService } from '../services/iso-3166-converter.service';

@Injectable()
export class MapLayerManagerService {
  // Read only properties

  private readonly config: TresholdConfig;
  private readonly dataset$: Observable<GeoJSON.FeatureCollection>;
  // Map country code directly to properties for fastest an easiest access
  private readonly countriesInfo$: Observable<LayerCountryInfo[]>;
  protected colors: ColorConfig;

  private layers: MapInfoLayers | Partial<MapInfoLayers> = {};
  private ready$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false,
  );

  constructor(
    private datasetService: MapboxDatasetService,
    private novelcovidService: NovelcovidService,
    iso3166: ISO3166ConverterService,
  ) {
    // Fetch all necessary data
    this.dataset$ = this.datasetService.fetchDatasetFeatures(
      environment.geoJSONId,
      environment.mapBox.username,
    );
    this.countriesInfo$ = this.novelcovidService.getCountriesInfo().pipe(
      // Mapping only needed properties
      map((countries) =>
        countries.map((country) => {
          const { country: name, deaths, recovered, critical, cases } = country;
          return {
            [LayerNames.CRITICAL]: critical,
            [LayerNames.INFECTED]: cases,
            [LayerNames.DEATHS]: deaths,
            [LayerNames.RECOVERIES]: recovered,
            country: iso3166.countryToCode(name, '3'),
          } as LayerCountryInfo;
        }),
      ),
    );

    this.config = MAP_LAYERS_TRESHOLD_CONFIG;
    this.colors = LAYER_COLORS;

    // Service won't work until all data is loaded
    combineLatest(
      this.dataset$.pipe(startWith(null)),
      this.countriesInfo$.pipe(startWith(null)),
    )
      .pipe(filter((data) => data.every((d) => d)))
      .subscribe(() => this.ready$.next(true));
  }

  getMapLayer$(name: LayerNames): Observable<MapInfoLayer> {
    if (this.layers[name]) {
      return of(this.layers[name]);
    }

    return combineLatest(this.dataset$, this.countriesInfo$).pipe(
      map(([dataset, countries]) => {
        this.layers[name] = this.calculateMapLayer(name, dataset, countries);
        return this.layers[name];
      }),
    );
  }

  get isReady$() {
    return this.ready$.asObservable();
  }

  private calculateMapLayer(
    name: LayerNames,
    dataset: GeoJSON.FeatureCollection,
    countriesInfo: LayerCountryInfo[],
  ): MapInfoLayer {
    const featureLayers: Array<{
      features: GeoJSON.FeatureCollection;
      alpha: number;
    }> = Object.entries(this.config).map(([key, { level, alpha }]) => {
      // Filter out the ISO 3166-3 code of the countries that fall in the current level
      const countriesInLevel = countriesInfo
        .filter((country) => this.isInRange(country[name], level))
        .map(({ country }) => country);
      // Filter out the GeoJSON Features of the countries
      const features: GeoJSON.FeatureCollection = {
        type: 'FeatureCollection',
        features: dataset.features.filter(({ properties: { A3 } }) =>
          countriesInLevel.includes(A3),
        ),
      };
      return {
        features,
        alpha,
      };
    });

    return {
      label: name,
      featureLayers,
      color: this.colors[name],
    };
  }

  private isInRange(level: number, treshold: MapLayerConfig) {
    const [low, high] = treshold;

    return low <= level && high >= level;
  }
}
