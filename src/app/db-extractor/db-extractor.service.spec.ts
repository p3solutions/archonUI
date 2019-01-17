import { TestBed } from '@angular/core/testing';

import { DbExtractorService } from './db-extractor.service';

describe('DbExtractorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbExtractorService = TestBed.get(DbExtractorService);
    expect(service).toBeTruthy();
  });
});
