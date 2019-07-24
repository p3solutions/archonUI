import { TestBed } from '@angular/core/testing';

import { PermissionService } from './permission.service';
import { WorkspaceServicesService } from '../workspace-services/workspace-services.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { UserinfoService } from '../userinfo.service';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';

describe('PermissionService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule, RouterTestingModule],
    providers: [WorkspaceServicesService, UserinfoService, { provide: EnvironmentService, useClass: MockEnvironmentService }]
  }));

  it('should be created', () => {
    const service: PermissionService = TestBed.get(PermissionService);
    expect(service).toBeTruthy();
  });
});
