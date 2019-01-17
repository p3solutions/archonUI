import { TestBed, inject } from '@angular/core/testing';

import { WorkspaceListService } from './workspace-list.service';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { RouterTestingModule } from '@angular/router/testing';

xdescribe('WorkspaceListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [WorkspaceListService, UserinfoService]
    });
  });

  it('should be created', inject([WorkspaceListService], (service: WorkspaceListService) => {
    expect(service).toBeTruthy();
  }));
});
