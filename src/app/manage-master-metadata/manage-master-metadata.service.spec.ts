import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ManageMasterMetadataService } from './manage-master-metadata.service';
import { UserinfoService } from '../userinfo.service';
import { RouterTestingModule } from '@angular/router/testing';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';

describe('ManageMasterMetadataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ManageMasterMetadataService, UserinfoService]
    });
  });

  it('should be created', inject([ManageMasterMetadataService], (service: ManageMasterMetadataService) => {
    expect(service).toBeTruthy();
  }));
});
