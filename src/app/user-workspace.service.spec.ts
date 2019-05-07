import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserWorkspaceService } from './user-workspace.service';
import { UserinfoService } from './userinfo.service';
import { RouterTestingModule } from '@angular/router/testing';
import { EnvironmentService } from './environment/environment.service';
import { MockEnvironmentService } from './environment/mock-environment.service';

describe('UserWorkspaceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        UserWorkspaceService,
        UserinfoService, { provide: EnvironmentService, useClass: MockEnvironmentService }
      ]
    });
  });

  it('should be created', inject([UserWorkspaceService], (service: UserWorkspaceService) => {
    expect(service).toBeTruthy();
  }));
});
