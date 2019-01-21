import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WorkspaceDashboardService } from './workspace-dashboard.service';

describe('SigninFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [WorkspaceDashboardService]
    });
  });

  it('should be created', inject([WorkspaceDashboardService], (service: WorkspaceDashboardService) => {
    expect(service).toBeTruthy();
  }));
});
