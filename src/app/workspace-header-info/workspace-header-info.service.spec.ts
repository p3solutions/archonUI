import { TestBed, inject } from '@angular/core/testing';

import { WorkspaceHeaderInfoService } from './workspace-header-info.service';

describe('WorkspaceHeaderInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkspaceHeaderInfoService]
    });
  });

  it('should be created', inject([WorkspaceHeaderInfoService], (service: WorkspaceHeaderInfoService) => {
    console.log('File name: workspace-header-info.service.spec.ts executed');
    expect(service).toBeTruthy();
    expect(service.dataAvailable).toBeFalsy();
  }));
});
