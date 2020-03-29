import { Inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { CountryInfo, GeneralInfo } from '@core/models';
import { NOVEL_COVID_SERVICE } from '@core/models/constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NovelcovidService {
  private readonly getAllInfoUrl;
  private readonly getCountriesInfoUrl;

  constructor(@Inject(NOVEL_COVID_SERVICE) private http: ApiService) {
    this.getAllInfoUrl = 'all';
    this.getCountriesInfoUrl = 'countries';
  }

  getAllInfo() {
    return this.http.get<GeneralInfo>(this.getAllInfoUrl);
  }

  getCountriesInfo() {
    return this.http.get<CountryInfo[]>(this.getCountriesInfoUrl).pipe(
      // The API is still returning wrong ISO codes...
      // This is and ad-hoc fix for the (IMHO) most important countries
      map(
        (countries) =>
          countries.map(({ country, ...rest }) => {
            switch (country) {
              case 'UK':
                return {
                  ...rest,
                  country: 'United Kingdom',
                  countryInfo: { iso3: 'GBR' },
                };
              case 'Iran':
                return {
                  ...rest,
                  country: 'Iran',
                  countryInfo: { iso3: 'IRN' },
                };
              case 'UAE':
                return { ...rest, country: 'ARE' };
              default:
                return { country, ...rest };
            }
          }) as CountryInfo[],
      ),
    );
  }

  getSpecificCountryInfo(country: string) {
    return this.http.get<CountryInfo>(`${this.getCountriesInfoUrl}/${country}`);
  }
}
