import { TestBed, inject } from '@angular/core/testing';

import { UserinfoService } from './userinfo.service';

describe('UserinfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserinfoService]
    });
  });

  it('should be created', inject([UserinfoService], (service: UserinfoService) => {
    expect(service).toBeTruthy();
  }));
});
