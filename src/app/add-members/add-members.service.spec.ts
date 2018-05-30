import { TestBed, inject } from '@angular/core/testing';

import { AddMembersService } from './add-members.service';

xdescribe('AddMembersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddMembersService]
    });
  });

  it('should be created', inject([AddMembersService], (service: AddMembersService) => {
    expect(service).toBeTruthy();
  }));
});
