import { TestBed, inject } from '@angular/core/testing';

import { AddDirectJoinService } from './add-direct-join.service';

describe('AddDirectJoinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddDirectJoinService]
    });
  });

  it('should be created', inject([AddDirectJoinService], (service: AddDirectJoinService) => {
    expect(service).toBeTruthy();
  }));
});
