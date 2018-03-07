import { TestBed, inject } from '@angular/core/testing';

import { DynamicLoaderService } from './dynamic-loader.service';

describe('DynamicLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamicLoaderService]
    });
  });

  it('should be created', inject([DynamicLoaderService], (service: DynamicLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
