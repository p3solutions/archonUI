import { TestBed } from '@angular/core/testing';
import { UserinfoService } from '../userinfo.service';
import { HttpClientModule } from '@angular/common/http';
import { ScheduleJobService } from './schedule-job.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ScheduleJobService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ScheduleJobService, UserinfoService],
    imports: [HttpClientModule, RouterTestingModule]

  }));

  it('should be created', () => {
    const service: ScheduleJobService = TestBed.get(ScheduleJobService);
    expect(service).toBeTruthy();
  });
});
