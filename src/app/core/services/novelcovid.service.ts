import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class NovelcovidService {

  private readonly getAllInfoUrl;
  private readonly getCountriesInfoUrl;
  private readonly getCountryInfoUrl;

  constructor(private http: ApiService) {
    this.getAllInfoUrl = 'all';
    this.getCountriesInfoUrl = 'countries';
   }

  getAllInfo(){
    return this.http.get(this.getAllInfoUrl);
  }

  getCountriesInfo(){
    return this.http.get(this.getCountriesInfoUrl);
  }

  getSpecificCountryInfo(country: string){
    return this.http.get(this.getCountriesInfoUrl+'/'+country);
  }

}
