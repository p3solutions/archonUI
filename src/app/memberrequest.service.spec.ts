import { TestBed, inject } from '@angular/core/testing';

import { MemberrequestService } from './memberrequest.service';

describe('MemberrequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemberrequestService]
    });
  });

  it('should be created', inject([MemberrequestService], (service: MemberrequestService) => {
    expect(service).toBeTruthy();
  }));
});
