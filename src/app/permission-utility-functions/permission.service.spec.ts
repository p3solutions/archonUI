import { TestBed } from '@angular/core/testing';

import { PermissionService } from './permission.service';
import { WorkspaceServicesService } from '../workspace-services/workspace-services.service';

describe('PermissionService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [WorkspaceServicesService]
  }));

  it('should be created', () => {
    const service: PermissionService = TestBed.get(PermissionService);
    expect(service).toBeTruthy();
  });
});
