import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ManageMasterMetadataService } from './manage-master-metadata.service';

describe('ManageMasterMetadataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule],
      providers: [ManageMasterMetadataService]
    });
  });

  it('should be created', inject([ManageMasterMetadataService], (service: ManageMasterMetadataService) => {
    expect(service).toBeTruthy();
  }));
});
