import { TestBed } from '@angular/core/testing';

import { MapperDateService } from './mapper-date.service';

describe('MapperDateService', () => {
  let service: MapperDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapperDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
