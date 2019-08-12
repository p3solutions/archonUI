import { TestBed, inject } from '@angular/core/testing';

import { ManageUserRolesService } from './manage-user-roles.service';
import { HttpClientModule } from '@angular/common/http';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';
import { UserinfoService } from '../userinfo.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ManageUserRolesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageUserRolesService,
        UserinfoService, { provide: EnvironmentService, useClass: MockEnvironmentService }],
      imports: [HttpClientModule, RouterTestingModule],
    });
  });

  it('should be created', inject([ManageUserRolesService], (service: ManageUserRolesService) => {
    expect(service).toBeTruthy();
  }));
});
