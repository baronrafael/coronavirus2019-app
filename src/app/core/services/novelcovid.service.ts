import { Inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { CountryHistory, CountryInfo, GeneralInfo } from '@core/models';
import { NOVEL_COVID_SERVICE } from '@core/models/constants';

@Injectable({
  providedIn: 'root',
})
export class NovelcovidService {
  private readonly getAllInfoUrl;
  private readonly getCountriesInfoUrl;
  private readonly getCountryHistoricalDataUrl;

  constructor(@Inject(NOVEL_COVID_SERVICE) private http: ApiService) {
    this.getAllInfoUrl = 'all';
    this.getCountriesInfoUrl = 'countries';
    this.getCountryHistoricalDataUrl = 'historical';
  }

  getAllInfo() {
    return this.http.get<GeneralInfo>(this.getAllInfoUrl);
  }

  getCountriesInfo() {
    return this.http.get<CountryInfo[]>(this.getCountriesInfoUrl);
  }

  getSpecificCountryInfo(country: string, lastDays: number = 30) {
    return this.http.get<CountryInfo>(
      `${this.getCountriesInfoUrl}/${country}`,
      {
        observe: 'response',
        params: {
          lastdays: String(lastDays),
        },
      },
    );
  }

  getHistoryForCountry(country: string, lastDays: number = 30) {
    return this.http.get<CountryHistory>(
      `${this.getCountryHistoricalDataUrl}/${country}`,
      {
        observe: 'response',
        params: {
          lastdays: String(lastDays),
        },
      },
    );
  }

  getHistoryForCountries(country: string[], lastDays: number = 30) {
    return this.http.get<CountryHistory[]>(
      `${this.getCountryHistoricalDataUrl}/${country.join(',')}`,
      {
        observe: 'response',
        params: {
          lastdays: String(lastDays),
        },
      },
    );
  }
}
