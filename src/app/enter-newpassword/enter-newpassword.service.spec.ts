import { TestBed, inject } from '@angular/core/testing';

import { EnterNewpasswordService } from './enter-newpassword.service';
import { HttpClientModule } from '@angular/common/http';

describe('EnterNewpasswordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [EnterNewpasswordService]
    });
  });

  it('should be created', inject([EnterNewpasswordService], (service: EnterNewpasswordService) => {
    expect(service).toBeTruthy();
  }));
});
