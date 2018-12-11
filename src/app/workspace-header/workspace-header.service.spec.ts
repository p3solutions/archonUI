import { TestBed, inject } from '@angular/core/testing';

import { WorkspaceHeaderService } from './workspace-header.service';

xdescribe('WorkspaceHeaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkspaceHeaderService]
    });
  });

  it('should be created', inject([WorkspaceHeaderService], (service: WorkspaceHeaderService) => {
    expect(service).toBeTruthy();
  }));
});
