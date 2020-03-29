import { TestBed } from '@angular/core/testing';

import { MapboxDatasetService } from './mapbox-dataset.service';

describe('MapboxDatasetService', () => {
  let service: MapboxDatasetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapboxDatasetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
