import { TestBed, inject } from '@angular/core/testing';

import { WorkspaceServicesService } from './workspace-services.service';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';

describe('WorkspaceServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkspaceServicesService, { provide: EnvironmentService, useClass: MockEnvironmentService }]
    });
  });

  it('should be created', inject([WorkspaceServicesService], (service: WorkspaceServicesService) => {
    expect(service).toBeTruthy();
  }));
});
