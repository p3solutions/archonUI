import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserWorkspaceService } from './user-workspace.service';
import { UserinfoService } from './userinfo.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserWorkspaceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        UserWorkspaceService,
        UserinfoService
      ]
    });
  });

  it('should be created', inject([UserWorkspaceService], (service: UserWorkspaceService) => {
    expect(service).toBeTruthy();
  }));
});
