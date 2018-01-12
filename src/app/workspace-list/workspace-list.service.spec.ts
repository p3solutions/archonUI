import { TestBed, inject } from '@angular/core/testing';

import { WorkspaceListService } from './workspace-list.service';

describe('WorkspaceListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkspaceListService]
    });
  });

  it('should be created', inject([WorkspaceListService], (service: WorkspaceListService) => {
    expect(service).toBeTruthy();
  }));
});
