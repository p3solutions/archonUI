import { TestBed } from '@angular/core/testing';

import { SsoSigninService } from './sso-signin.service';

describe('SsoSigninService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SsoSigninService = TestBed.get(SsoSigninService);
    expect(service).toBeTruthy();
  });
});
