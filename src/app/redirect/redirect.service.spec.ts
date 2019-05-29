import { TestBed } from '@angular/core/testing';

import { RedirectService } from './redirect.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';

describe('RedirectService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientTestingModule],
    providers:[{ provide: EnvironmentService, useClass: MockEnvironmentService}]
  }));

  it('should be created', () => {
    const service: RedirectService = TestBed.get(RedirectService);
    expect(service).toBeTruthy();
  });
});
