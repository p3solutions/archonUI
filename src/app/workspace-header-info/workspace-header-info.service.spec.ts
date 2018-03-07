import { TestBed, inject } from '@angular/core/testing';

import { WorkspaceHeaderInfoService } from '../workspace-header-info.service';

describe('WorkspaceHeaderInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkspaceHeaderInfoService]
    });
  });

  it('should be created', inject([WorkspaceHeaderInfoService], (service: WorkspaceHeaderInfoService) => {
    expect(service).toBeTruthy();
  }));
});
