import { Inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { CountryInfo, GeneralInfo } from '@core/models';
import { NOVEL_COVID_SERVICE } from '@core/models/constants';

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
    return this.http.get<CountryInfo[]>(this.getCountriesInfoUrl);
  }

  getSpecificCountryInfo(country: string) {
    return this.http.get<CountryInfo>(`${this.getCountriesInfoUrl}/${country}`);
  }
}
