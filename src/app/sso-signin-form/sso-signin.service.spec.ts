import { TestBed } from '@angular/core/testing';

import { SsoSigninService } from './sso-signin.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';

describe('SsoSigninService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [{ provide: EnvironmentService, useClass: MockEnvironmentService }]
  }));

  it('should be created', () => {
    const service: SsoSigninService = TestBed.get(SsoSigninService);
    expect(service).toBeTruthy();
  });
});
