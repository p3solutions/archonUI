import { TestBed, inject } from '@angular/core/testing';

import { WorkspaceListService } from './workspace-list.service';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { RouterTestingModule } from '@angular/router/testing';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';

describe('WorkspaceListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [WorkspaceListService, UserinfoService, WorkspaceHeaderService, { provide: EnvironmentService, useClass: MockEnvironmentService }],
    });
  });

  it('should be created', inject([WorkspaceListService], (service: WorkspaceListService) => {
    expect(service).toBeTruthy();
  }));
});
