import { TestBed, inject } from '@angular/core/testing';

import { WorkspaceServicesService } from './workspace-services.service';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { UserinfoService } from '../userinfo.service';

describe('WorkspaceServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [WorkspaceServicesService, NgxSpinnerService, UserinfoService, { provide: EnvironmentService, useClass: MockEnvironmentService }]
    });
  });

  it('should be created', inject([WorkspaceServicesService], (service: WorkspaceServicesService) => {
    expect(service).toBeTruthy();
  }));
});
