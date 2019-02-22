import { TestBed, inject } from '@angular/core/testing';

import { EditRelationshipInfoService } from './edit-relationship-info.service';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../../userinfo.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('EditRelationshipInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [EditRelationshipInfoService, UserinfoService]
    });
  });

  it('should be created', inject([EditRelationshipInfoService], (service: EditRelationshipInfoService) => {
    expect(service).toBeTruthy();
  }));
});
