import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { CountryHistory } from '@core/models';
import { EMPTY, Observable } from 'rxjs';
import { NovelcovidService } from '@core/services';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CountryResolver implements Resolve<CountryHistory> {
  constructor(private novelcovidService: NovelcovidService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<CountryHistory> | Promise<CountryHistory> | CountryHistory {
    if (!route.paramMap.get('countryName')) {
      return EMPTY;
    }
    return this.novelcovidService
      .getHistoryForCountry(route.paramMap.get('countryName'))
      .pipe(catchError(() => EMPTY));
  }
}
