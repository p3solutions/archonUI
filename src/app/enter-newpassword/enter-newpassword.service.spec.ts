import { TestBed, inject } from '@angular/core/testing';

import { EnterNewpasswordService } from './enter-newpassword.service';
import { HttpClientModule } from '@angular/common/http';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';

describe('EnterNewpasswordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [EnterNewpasswordService, { provide: EnvironmentService, useClass: MockEnvironmentService }]
    });
  });

  it('should be created', inject([EnterNewpasswordService], (service: EnterNewpasswordService) => {
    expect(service).toBeTruthy();
  }));
});
