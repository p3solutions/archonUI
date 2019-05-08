import { TestBed, inject } from '@angular/core/testing';

import { ManageMembersService } from './manage-members.service';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { RouterTestingModule } from '@angular/router/testing';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';

describe('ManageMembersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        ManageMembersService,
        UserinfoService, { provide: EnvironmentService, useClass: MockEnvironmentService }
      ]
    });
  });

  it('should be created', inject([ManageMembersService], (service: ManageMembersService) => {
    expect(service).toBeTruthy();
  }));
});
