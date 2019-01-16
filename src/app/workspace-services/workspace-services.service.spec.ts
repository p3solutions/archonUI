import { TestBed, inject } from '@angular/core/testing';

import { WorkspaceServicesService } from './workspace-services.service';

describe('WorkspaceServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkspaceServicesService]
    });
  });

  it('should be created', inject([WorkspaceServicesService], (service: WorkspaceServicesService) => {
    expect(service).toBeTruthy();
  }));
});
