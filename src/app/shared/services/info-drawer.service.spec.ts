import { TestBed } from '@angular/core/testing';

import { InfoDrawerService } from './info-drawer.service';

describe('InfoDrawerService', () => {
  let service: InfoDrawerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoDrawerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
