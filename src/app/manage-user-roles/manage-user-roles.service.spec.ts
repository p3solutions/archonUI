import { TestBed, inject } from '@angular/core/testing';

import { ManageUserRolesService } from './manage-user-roles.service';
import { HttpClientModule } from '@angular/common/http';

describe('ManageUserRolesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageUserRolesService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([ManageUserRolesService], (service: ManageUserRolesService) => {
    expect(service).toBeTruthy();
  }));
});
