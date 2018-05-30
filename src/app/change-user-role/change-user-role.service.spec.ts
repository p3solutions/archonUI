import { TestBed, inject } from '@angular/core/testing';

import { ChangeUserRoleService } from './change-user-role.service';

xdescribe('ChangeUserRoleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangeUserRoleService]
    });
  });

  it('should be created', inject([ChangeUserRoleService], (service: ChangeUserRoleService) => {
    expect(service).toBeTruthy();
  }));
});
