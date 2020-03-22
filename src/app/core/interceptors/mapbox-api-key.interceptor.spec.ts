import { TestBed } from '@angular/core/testing';

import { MapboxApiKeyInterceptor } from './mapbox-api-key.interceptor';

describe('MapboxApiKeyInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [MapboxApiKeyInterceptor],
    }),
  );

  it('should be created', () => {
    const interceptor: MapboxApiKeyInterceptor = TestBed.inject(
      MapboxApiKeyInterceptor,
    );
    expect(interceptor).toBeTruthy();
  });
});
