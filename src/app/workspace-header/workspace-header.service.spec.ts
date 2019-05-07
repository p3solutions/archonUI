import { TestBed, inject } from '@angular/core/testing';

import { WorkspaceHeaderService } from './workspace-header.service';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';

describe('WorkspaceHeaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkspaceHeaderService, { provide: EnvironmentService, useClass: MockEnvironmentService }]
    });
  });

  it('should be created', inject([WorkspaceHeaderService], (service: WorkspaceHeaderService) => {
    expect(service).toBeTruthy();
  }));
});
