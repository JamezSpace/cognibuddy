import { TestBed } from '@angular/core/testing';

import { ChildDashboardService } from './child-dashboard.service';

describe('ChildDashboardService', () => {
  let service: ChildDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChildDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
