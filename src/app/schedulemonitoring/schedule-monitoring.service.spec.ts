import { TestBed } from '@angular/core/testing';

import { ScheduleMonitoringService } from './schedule-monitoring.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ScheduleMonitoringService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, HttpClientModule, RouterTestingModule],
    providers: [UserinfoService]
  }));

  it('should be created', () => {
    const service: ScheduleMonitoringService = TestBed.get(ScheduleMonitoringService);
    expect(service).toBeTruthy();
  });
});
