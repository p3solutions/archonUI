import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { RouterTestingModule } from '@angular/router/testing';
import { StoredProcViewService } from './stored-proc-view.service';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';

describe('StoredProcViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [StoredProcViewService, UserinfoService, { provide: EnvironmentService, useClass: MockEnvironmentService }],
    imports: [HttpClientModule, RouterTestingModule]
  }));

  it('should be created', () => {
    const service: StoredProcViewService = TestBed.get(StoredProcViewService);
    expect(service).toBeTruthy();
  });
});
