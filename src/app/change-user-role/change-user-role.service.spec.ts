import { TestBed, inject } from '@angular/core/testing';

import { ChangeUserRoleService } from './change-user-role.service';

describe('ChangeUserRoleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangeUserRoleService]
    });
  });

  it('should be created', inject([ChangeUserRoleService], (service: ChangeUserRoleService) => {
    expect(service).toBeTruthy();
  }));
});
