import { TestBed } from '@angular/core/testing';

import { AdhocSavedObjectService } from './adhoc-saved-object.service';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';

describe('AdhocSavedObjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{ provide: EnvironmentService, useClass: MockEnvironmentService }]
  }));

  it('should be created', () => {
    const service: AdhocSavedObjectService = TestBed.get(AdhocSavedObjectService);
    expect(service).toBeTruthy();
  });
});
