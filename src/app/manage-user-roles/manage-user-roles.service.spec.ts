import { TestBed, inject } from '@angular/core/testing';

import { ManageUserRolesService } from './manage-user-roles.service';

xdescribe('ManageUserRolesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageUserRolesService]
    });
  });

  it('should be created', inject([ManageUserRolesService], (service: ManageUserRolesService) => {
    expect(service).toBeTruthy();
  }));
});
