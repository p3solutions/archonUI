import { TestBed, inject } from '@angular/core/testing';

import { WorkspaceInfoService } from './workspace-info.service';

describe('WorkspaceInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkspaceInfoService]
    });
  });

  it('should be created', inject([WorkspaceInfoService], (service: WorkspaceInfoService) => {
    expect(service).toBeTruthy();
  }));
});
