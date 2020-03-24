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
import { NovelcovidService } from '@core/services';
import { BehaviorSubject, combineLatest, Observable, of, timer } from 'rxjs';
import { filter, map, shareReplay, startWith, takeUntil } from 'rxjs/operators';
import {
  LAYER_COLORS,
  MAP_LAYERS_TRESHOLD_CONFIG,
} from '@shared/config/layers-config';
import { ISO3166ConverterService } from '../services/iso-3166-converter.service';

@Injectable()
export class MapLayerManagerService {
  // Read only properties

  private readonly config: TresholdConfig;
  // Map country code directly to properties for fastest an easiest access
  private readonly countriesInfo$: Observable<LayerCountryInfo[]>;
  // Refetch every hour
  private readonly CACHE_TIME = 360000000;
  private readonly refresh$: Observable<any>;
  protected colors: ColorConfig;

  private layers: MapInfoLayers | Partial<MapInfoLayers> = {};
  private ready$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false,
  );

  constructor(
    private novelcovidService: NovelcovidService,
    iso3166: ISO3166ConverterService,
  ) {
    this.refresh$ = timer(this.CACHE_TIME);
    this.countriesInfo$ = this.novelcovidService.getCountriesInfo().pipe(
      shareReplay(),
      takeUntil(this.refresh$),
      // Mapping only needed properties
      map((countries) =>
        countries.map((country) => {
          const {
            countryInfo: { iso3 },
            country: name,
            deaths,
            recovered,
            critical,
            cases,
          } = country;
          return {
            [LayerNames.CRITICAL]: critical,
            [LayerNames.INFECTED]: cases,
            [LayerNames.DEATHS]: deaths,
            [LayerNames.RECOVERIES]: recovered,
            // API is not consistent, some countries already had an ISO 3166-3
            // code as name, so the leaved it that way and did not add info
            // in the countryInfo key
            country: iso3166.isISOAlphaCode(name, '3') ? name : iso3,
          } as LayerCountryInfo;
        }),
      ),
      // Filter out places that are not countries (like the diamond princess)
      map((countries) =>
        countries.filter(({ country }) => iso3166.checkValidity(country)),
      ),
    );

    this.config = MAP_LAYERS_TRESHOLD_CONFIG;
    this.colors = LAYER_COLORS;

    // Service won't work until all data is loaded
    combineLatest([this.countriesInfo$.pipe(startWith(null))])
      .pipe(filter((data) => data.every((d) => d)))
      .subscribe(() => this.ready$.next(true));
  }

  getMapLayer$(name: LayerNames): Observable<MapInfoLayer> {
    if (this.layers[name]) {
      return of(this.layers[name]);
    }

    return combineLatest([this.countriesInfo$]).pipe(
      map(([countries]) => {
        this.layers[name] = this.calculateMapLayer(name, countries);
        return this.layers[name];
      }),
    );
  }

  get isReady$() {
    return this.ready$.asObservable();
  }

  private calculateMapLayer(
    name: LayerNames,
    countriesInfo: LayerCountryInfo[],
  ): MapInfoLayer {
    const featureLayers: Array<{
      alpha3Codes: string[];
      alpha: number;
    }> = Object.entries(this.config).map(([, { level, alpha }]) => {
      // Filter out the ISO 3166-3 code of the countries that fall in the current level
      const alpha3Codes = countriesInfo
        .filter((country) => this.isInRange(country[name], level))
        .map(({ country }) => country);
      return {
        alpha3Codes,
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
