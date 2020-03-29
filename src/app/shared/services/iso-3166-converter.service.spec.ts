import { TestBed } from '@angular/core/testing';

import { ISO3166ConverterService } from './iso-3166-converter.service';

describe('Iso3166ConverterService', () => {
  let service: ISO3166ConverterService;
  const country = 'United States';
  const alpha2 = 'US';
  const alpha3 = 'USA';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ISO3166ConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should convert alpha to code', () => {
    const res1 = service.countryToCode(country, '2');
    const res2 = service.countryToCode(country, '3');

    expect(res1).toBe(alpha2);
    expect(res2).toBe(alpha3);
  });
});
