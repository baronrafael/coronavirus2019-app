import { Injectable } from '@angular/core';

import * as i18nIso from 'i18n-iso-countries';

@Injectable()
export class ISO3166ConverterService {
  private readonly locale = 'en';

  constructor() {
    i18nIso.registerLocale(require('i18n-iso-countries/langs/en.json'));
  }

  countryToCode(name: string, alpha: '2' | '3') {
    // Couple of ad-hoc cases since the API does not use standardized country names,
    // hope that gets fixed soon because this is ugly as heck
    switch (name) {
      case 'USA':
        return 'USA';
      case 'UAE':
        return 'ARE';
      case 'UK':
        return 'GBR';
      case 'Iran':
        return 'IRN';
      case 'S. Korea':
        return 'KOR';
      case 'Russia':
        return 'RUS';
      case 'Syria':
        return 'SYR';
      case 'Czechia':
        return 'CZE';
      case 'Palestine':
        return 'PSE';
      case 'Australia':
        return 'AUS';
    }

    return this.alphaConverter(name, alpha);
  }

  codeToCountry(code: string) {
    return i18nIso.getName(code, this.locale);
  }

  private alphaConverter(name, alpha: '2' | '3') {
    return alpha === '2'
      ? i18nIso.getAlpha2Code(name, this.locale)
      : i18nIso.getAlpha3Code(name, this.locale);
  }
}
