import { TestBed, inject } from '@angular/core/testing';

import { ChangeUserRoleService } from './change-user-role.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockBackend } from '@angular/http/testing';
import { XHRBackend } from '@angular/http';

describe('ChangeUserRoleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: MockBackend, useClass: MockBackend },
        { provide: XHRBackend, useExisting: MockBackend },
        ChangeUserRoleService,
        HttpClientModule
      ]
    });
  });

  it('should be created', inject([ChangeUserRoleService], (service: ChangeUserRoleService) => {
    expect(service).toBeTruthy();
  }));
});
