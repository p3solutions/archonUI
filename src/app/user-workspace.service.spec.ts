import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserWorkspaceService } from './user-workspace.service';

describe('UserWorkspaceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [UserWorkspaceService, HttpClientModule]
    });
  });

  it('should be created', inject([UserWorkspaceService], (service: UserWorkspaceService) => {
    expect(service).toBeTruthy();
  }));
});
