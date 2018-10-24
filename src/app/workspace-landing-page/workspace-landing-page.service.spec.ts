import { TestBed, inject } from '@angular/core/testing';

import { WorkspaceLandingPageService } from './workspace-landing-page.service';

describe('WorkspaceLandingPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkspaceLandingPageService]
    });
  });

  it('should be created', inject([WorkspaceLandingPageService], (service: WorkspaceLandingPageService) => {
    expect(service).toBeTruthy();
  }));
});
