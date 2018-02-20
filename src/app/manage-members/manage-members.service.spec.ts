import { TestBed, inject } from '@angular/core/testing';

import { ManageMembersService } from './manage-members.service';

describe('ManageMembersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageMembersService]
    });
  });

  // it('should be created', inject([ManageMembersService], (service: ManageMembersService) => {
  //   expect(service).toBeTruthy();
  // }));
});
