import { TestBed } from '@angular/core/testing';

import { BrandsDetailsService } from './brands-details.service';

describe('BrandsDetailsService', () => {
  let service: BrandsDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandsDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
