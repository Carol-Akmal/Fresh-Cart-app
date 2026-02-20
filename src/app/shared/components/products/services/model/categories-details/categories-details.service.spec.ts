import { TestBed } from '@angular/core/testing';

import { CategoriesDetailsService } from './categories-details.service';

describe('CategoriesDetailsService', () => {
  let service: CategoriesDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
