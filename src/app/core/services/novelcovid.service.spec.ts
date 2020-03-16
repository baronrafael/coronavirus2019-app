import { TestBed } from '@angular/core/testing';

import { NovelcovidService } from './novelcovid.service';

describe('NovelcovidService', () => {
  let service: NovelcovidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NovelcovidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
