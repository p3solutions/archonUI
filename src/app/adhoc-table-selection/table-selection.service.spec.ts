import { TestBed } from '@angular/core/testing';

import { TableSelectionService } from './table-selection.service';

describe('TableSelectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TableSelectionService = TestBed.get(TableSelectionService);
    expect(service).toBeTruthy();
  });
});
