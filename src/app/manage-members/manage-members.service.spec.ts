import { TestBed, inject } from '@angular/core/testing';

import { ManageMembersService } from './manage-members.service';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';

xdescribe('ManageMembersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [
        ManageMembersService,
        UserinfoService
      ]
    });
  });

  it('should be created', inject([ManageMembersService], (service: ManageMembersService) => {
    expect(service).toBeTruthy();
  }));
});
