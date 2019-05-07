import { TestBed } from '@angular/core/testing';

import { AdhocScreenService } from './adhoc-screen.service';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';

describe('AdhocScreenService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{ provide: EnvironmentService, useClass: MockEnvironmentService }]
  }));

  it('should be created', () => {
    const service: AdhocScreenService = TestBed.get(AdhocScreenService);
    expect(service).toBeTruthy();
  });
});
