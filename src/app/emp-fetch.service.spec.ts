import { TestBed } from '@angular/core/testing';

import { EmpFetchService } from './emp-fetch.service';

describe('EmpFetchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmpFetchService = TestBed.get(EmpFetchService);
    expect(service).toBeTruthy();
  });
});
