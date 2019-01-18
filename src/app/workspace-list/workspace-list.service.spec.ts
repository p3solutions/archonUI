import { TestBed, inject } from '@angular/core/testing';

import { WorkspaceListService } from './workspace-list.service';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';

xdescribe('WorkspaceListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [WorkspaceListService, UserinfoService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  it('should be created', inject([WorkspaceListService], (service: WorkspaceListService) => {
    expect(service).toBeTruthy();
  }));
});
