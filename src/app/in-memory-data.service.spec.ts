import { TestBed, inject } from '@angular/core/testing';

import { InMemoryDataService } from './in-memory-data.service';

xdescribe('InMemoryDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InMemoryDataService]
    });
  });
});
