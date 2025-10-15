import { TestBed } from '@angular/core/testing';

import { LeaderboradFilterService } from './leaderborad-filter-service';

describe('LeaderboradFilterService', () => {
  let service: LeaderboradFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaderboradFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
