import { Injectable } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import * as i18nIso from 'i18n-iso-countries';

@Injectable({
  providedIn: SharedModule,
})
export class ISO3166ConverterService {
  private readonly locale = 'en';

  constructor() {
    i18nIso.registerLocale(require('i18n-iso-countries/langs/en.json'));
  }

  countryToCode(name: string, alpha: '2' | '3') {
    if (alpha === '2') {
      return i18nIso.getAlpha2Code(name, this.locale);
    }
    return i18nIso.getAlpha3Code(name, this.locale);
  }

  codeToCountry(code: string) {
    return i18nIso.getName(code, this.locale);
  }
}
