import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NovelcovidService } from 'src/app/core/services/novelcovid.service';
import { CountryInfo } from '@core/models';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesComponent implements OnInit {
  countryInfo: BehaviorSubject<CountryInfo[]> = new BehaviorSubject<
    CountryInfo[]
  >([]);
  filteredCountries: BehaviorSubject<CountryInfo[]> = new BehaviorSubject<
    CountryInfo[]
  >([]);

  // tslint:disable-next-line:variable-name
  _listFilter = '';

  constructor(private novelCovid: NovelcovidService) {}

  ngOnInit(): void {
    this.getCountriesInfo();
  }

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredCountries.next(
      this.listFilter
        ? this.doFilter(this.listFilter)
        : this.countryInfo.getValue(),
    );
  }

  doFilter(filterBy: string): any[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.countryInfo
      .getValue()
      .filter(
        (country: CountryInfo) =>
          country.country.toLocaleLowerCase().indexOf(filterBy) !== -1,
      );
  }

  getCountriesInfo() {
    this.novelCovid.getCountriesInfo().subscribe(
      (res) => {
        this.countryInfo.next(res);
        this.filteredCountries.next(res);
      },
      (err) => {
        console.log(err);
      },
    );
  }
}
