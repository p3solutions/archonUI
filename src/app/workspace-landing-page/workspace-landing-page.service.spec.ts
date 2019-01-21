import { TestBed, inject } from '@angular/core/testing';

import { WorkspaceLandingPageService } from './workspace-landing-page.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { UserinfoService } from '../userinfo.service';

describe('WorkspaceLandingPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [WorkspaceLandingPageService, UserinfoService]
    });
  });

  it('should be created', inject([WorkspaceLandingPageService], (service: WorkspaceLandingPageService) => {
    expect(service).toBeTruthy();
  }));
});
