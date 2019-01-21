import { TestBed, inject } from '@angular/core/testing';

import { WorkspaceInfoService } from './workspace-info.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { UserinfoService } from '../userinfo.service';

describe('WorkspaceInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [WorkspaceInfoService, UserinfoService]
    });
  });

  it('should be created', inject([WorkspaceInfoService], (service: WorkspaceInfoService) => {
    expect(service).toBeTruthy();
  }));
});
