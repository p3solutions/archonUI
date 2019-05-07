import { TestBed, inject } from '@angular/core/testing';

import { EditRelationshipInfoService } from './edit-relationship-info.service';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { RouterTestingModule } from '@angular/router/testing';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';

describe('EditRelationshipInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [EditRelationshipInfoService, UserinfoService, { provide: EnvironmentService, useClass: MockEnvironmentService }]
    });
  });

  it('should be created', inject([EditRelationshipInfoService], (service: EditRelationshipInfoService) => {
    expect(service).toBeTruthy();
  }));
});
