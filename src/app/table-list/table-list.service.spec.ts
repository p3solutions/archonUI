import { TestBed, inject } from '@angular/core/testing';

import { TableListService } from './table-list.service';

describe('TableListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableListService]
    });
  });

  it('should be created', inject([TableListService], (service: TableListService) => {
    expect(service).toBeTruthy();
  }));
});
