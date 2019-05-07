import { TestBed, inject } from '@angular/core/testing';

import { WorkspaceLandingPageService } from './workspace-landing-page.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { UserinfoService } from '../userinfo.service';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';

describe('WorkspaceLandingPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [WorkspaceLandingPageService, UserinfoService, { provide: EnvironmentService, useClass: MockEnvironmentService }]
    });
  });

  it('should be created', inject([WorkspaceLandingPageService], (service: WorkspaceLandingPageService) => {
    expect(service).toBeTruthy();
  }));
});
