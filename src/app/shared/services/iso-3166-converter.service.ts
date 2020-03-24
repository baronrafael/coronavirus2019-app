import { Injectable } from '@angular/core';

import * as i18nIso from 'i18n-iso-countries';

@Injectable()
export class ISO3166ConverterService {
  private readonly locale = 'en';

  constructor() {
    i18nIso.registerLocale(require('i18n-iso-countries/langs/en.json'));
  }

  countryToCode(name: string, alpha: '2' | '3') {
    return this.alphaConverter(name, alpha);
  }

  codeToCountry(code: string) {
    return i18nIso.getName(code, this.locale);
  }

  checkValidity(code: string) {
    return i18nIso.isValid(code);
  }

  isISOAlphaCode(name: string, alpha: '2' | '3') {
    return alpha === '2'
      ? !!i18nIso.getAlpha2Codes()[name]
      : !!i18nIso.getAlpha3Codes()[name];
  }

  private alphaConverter(name, alpha: '2' | '3') {
    return alpha === '2'
      ? i18nIso.getAlpha2Code(name, this.locale)
      : i18nIso.getAlpha3Code(name, this.locale);
  }
}
