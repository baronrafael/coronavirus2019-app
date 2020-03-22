import { Component, OnDestroy, OnInit } from '@angular/core';
import { NovelcovidService } from '@core/services/novelcovid.service';
import { LocationService } from '@core/services/location.service';
import { CountryInfo, GeneralInfo, HomeSummary } from '@core/models';
import { BehaviorSubject, EMPTY, Observable, pipe, Subject } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';
import { InfoDrawerService } from '@shared/services/info-drawer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  generalInfo$: Observable<GeneralInfo>;
  countriesInfo$: Observable<CountryInfo[]>;
  currentCountry$: Observable<CountryInfo>;
  homeSummary$: BehaviorSubject<HomeSummary> = new BehaviorSubject<HomeSummary>(
    {
      todayCases: 0,
      todayDeaths: 0,
      totalCriticalCases: 0,
    },
  );
  destroy$ = new Subject();

  constructor(
    private locationService: LocationService,
    private novelCovid: NovelcovidService,
    public infoDrawer: InfoDrawerService,
  ) {}

  ngOnInit(): void {
    this.getLocationInfo();
    this.generalInfo$ = this.novelCovid.getAllInfo().pipe(this.logAndCatch());
    this.countriesInfo$ = this.novelCovid
      .getCountriesInfo()
      .pipe(this.logAndCatch());

    // Calculations
    this.countriesInfo$
      .pipe(takeUntil(this.destroy$))
      .subscribe((info) => this.calculateStats(info));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  getLocationInfo() {
    this.locationService.getLocationWithIP().subscribe(
      (res: any) => {
        this.getSpecificCountryInfo(res.country_name);
      },
      (err: any) => {
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
    this.currentCountry$ = this.novelCovid.getSpecificCountryInfo(country);
  }

  calculateStats(info: CountryInfo[]) {
    const caseCalculations = {
      totalCriticalCases: 0,
      todayCases: 0,
      todayDeaths: 0,
    };
    info.reduce<typeof caseCalculations>(
      ({ totalCriticalCases, todayCases, todayDeaths }, curr) => ({
        todayDeaths: todayDeaths + curr.todayDeaths,
        todayCases: todayCases + curr.todayCases,
        totalCriticalCases: totalCriticalCases + curr.critical,
      }),
      caseCalculations,
    );
    this.homeSummary$.next(caseCalculations);
  }

  private logAndCatch() {
    return pipe(
      tap((info: any) => console.log(info)),
      catchError((err) => {
        console.log(err);
        return EMPTY;
      }),
    );
  }
}
