import { TestBed, inject } from '@angular/core/testing';

import { UserProfileService } from './user-profile.service';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserProfileService, { provide: EnvironmentService, useClass: MockEnvironmentService }]
    });
  });

  it('should be created', inject([UserProfileService], (service: UserProfileService) => {
    expect(service).toBeTruthy();
  }));
});
