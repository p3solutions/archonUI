import { TestBed, inject } from '@angular/core/testing';

import { MemberRequestService } from './member-request.service';

describe('MemberRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemberRequestService]
    });
  });

  it('should be created', inject([MemberRequestService], (service: MemberRequestService) => {
    expect(service).toBeTruthy();
  }));
});
