import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ManageMasterMetadataService } from './manage-master-metadata.service';

xdescribe('ManageMasterMetadataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [ManageMasterMetadataService, HttpClientTestingModule]
    });
  });

  it('should be created', inject([ManageMasterMetadataService], (service: ManageMasterMetadataService) => {
    expect(service).toBeTruthy();
  }));
});
