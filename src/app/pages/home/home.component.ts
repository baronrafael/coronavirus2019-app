import { Component, OnInit } from '@angular/core';
import { NovelcovidService } from '@core/services/novelcovid.service';
import { LocationService } from '@core/services/location.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  generalInfo: any;
  CountriesInfo: any;
  currentCountry: any;
  totalCriticalCases: number;
  todayCases: number;
  todayDeaths: number;

  constructor(
    private locationService: LocationService,
    private novelCovid: NovelcovidService,
  ) {}

  ngOnInit(): void {
    this.getLocationInfo();
    this.getAllInfo();
    this.getCountriesInfo();
  }

  getLocationInfo() {
    this.locationService.getLocationWithIP().subscribe(
      (res: any) => {
        // console.log(res);
        this.getSpecificCountryInfo(res.country_name);
      },
      (err: any) => {
        console.log(err);
      },
    );
  }

  getAllInfo() {
    this.novelCovid.getAllInfo().subscribe(
      (res) => {
        // console.log(res)
        this.generalInfo = res;
        console.log(this.generalInfo);
      },
      (err) => {
        console.log(err);
      },
    );
  }

  getCountriesInfo() {
    this.novelCovid.getCountriesInfo().subscribe(
      (res) => {
        // console.log(res)
        this.CountriesInfo = res;
        console.log(this.CountriesInfo);
        this.calculateStats();
      },
      (err) => {
        console.log(err);
      },
    );
  }

  getSpecificCountryInfo(country: string) {
    if (country === 'United States') {
      country = 'USA';
    } else if (country === 'United Kingdom') {
      country = 'UK';
    }
    this.novelCovid.getSpecificCountryInfo(country).subscribe(
      (res) => {
        // console.log(res)
        this.currentCountry = res;
        console.log(this.currentCountry);
      },
      (err) => {
        console.log(err);
      },
    );
  }

  calculateStats() {
    this.totalCriticalCases = 0;
    this.todayCases = 0;
    this.todayDeaths = 0;
    for (let i = 0; i < this.CountriesInfo.length; i++) {
      this.totalCriticalCases =
        this.totalCriticalCases + this.CountriesInfo[i].critical;
      this.todayCases = this.todayCases + this.CountriesInfo[i].todayCases;
      this.todayDeaths = this.todayDeaths + this.CountriesInfo[i].todayDeaths;
    }
  }
}
