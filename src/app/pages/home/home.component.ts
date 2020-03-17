import { Component, OnInit } from '@angular/core';
import { NovelcovidService } from 'src/app/core/services/novelcovid.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  generalInfo: any;
  CountriesInfo: any;
  totalCriticalCases: number;
  todayCases: number;
  todayDeaths: number;

  constructor(
    private novelCovid: NovelcovidService
  ) { }

  ngOnInit(): void {
    this.getAllInfo();
    this.getCountriesInfo();
    if (navigator.geolocation) {
      console.log("🗺️ yep, we can proceed!");
      navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
    } else {
      console.log("no can do");
    }
  }

  displayLocationInfo(position) {
    console.log(position.coords);
  }

  getAllInfo(){
    this.novelCovid.getAllInfo()
    .subscribe(
      (res) => {
        //console.log(res)
        this.generalInfo = res;
        console.log(this.generalInfo);
      },
      (err) => {
        console.log(err);
      },
    );
  }

  getCountriesInfo(){
    this.novelCovid.getCountriesInfo()
    .subscribe(
      (res) => {
        //console.log(res)
        this.CountriesInfo = res;
        console.log(this.CountriesInfo);
        this.calculateTodaysStats();
      },
      (err) => {
        console.log(err);
      },
    );
  }

  getSpecificCountryInfo(country: string){
    this.novelCovid.getSpecificCountryInfo(country)
    .subscribe(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err);
      },
    );
  }

  calculateTodaysStats(){
    this.totalCriticalCases = 0;
    this.todayCases = 0;
    this.todayDeaths = 0;
    for(let i = 0; i < this.CountriesInfo.length; i++){
      this.totalCriticalCases = this.totalCriticalCases + this.CountriesInfo[i].critical;
      this.todayCases = this.todayCases + this.CountriesInfo[i].todayCases;
      this.todayDeaths = this.todayDeaths + this.CountriesInfo[i].todayDeaths;
    }
  }

}
