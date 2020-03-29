import { TestBed } from '@angular/core/testing';

import { MapLayerManagerService } from './map-layer-manager.service';

describe('MapLayerManagerService', () => {
  let service: MapLayerManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapLayerManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
