import { TestBed } from '@angular/core/testing';

import { ScheduleMonitoringService } from './schedule-monitoring.service';

describe('ScheduleMonitoringService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScheduleMonitoringService = TestBed.get(ScheduleMonitoringService);
    expect(service).toBeTruthy();
  });
});
