import { TestBed, inject } from '@angular/core/testing';

import { UserWorkspaceService } from './user-workspace.service';

xdescribe('UserWorkspaceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserWorkspaceService]
    });
  });

  it('should be created', inject([UserWorkspaceService], (service: UserWorkspaceService) => {
    expect(service).toBeTruthy();
  }));
});
