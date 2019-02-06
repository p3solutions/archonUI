import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { RouterTestingModule } from '@angular/router/testing';
import { StoredProcViewService } from './stored-proc-view.service';
import { HttpClient } from '@angular/common/http';

describe('StoredProcViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [StoredProcViewService, UserinfoService],
    imports: [HttpClientModule, RouterTestingModule]
  }));

  it('should be created', () => {
    const service: StoredProcViewService = TestBed.get(StoredProcViewService);
    expect(service).toBeTruthy();
  });
});
