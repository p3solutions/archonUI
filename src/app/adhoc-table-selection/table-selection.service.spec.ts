import { TestBed } from '@angular/core/testing';

import { TableSelectionService } from './table-selection.service';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';

describe('TableSelectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{ provide: EnvironmentService, useClass: MockEnvironmentService }]
  }));

  it('should be created', () => {
    const service: TableSelectionService = TestBed.get(TableSelectionService);
    expect(service).toBeTruthy();
  });
});
