import { TestBed } from '@angular/core/testing';

import { MapperDTOService } from './mapper-dto.service';

describe('MapperDTOService', () => {
  let service: MapperDTOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapperDTOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
