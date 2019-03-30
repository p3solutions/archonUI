import { TestBed } from '@angular/core/testing';

import { AdhocService } from './adhoc.service';
import { Adhoc } from './adhoc';
import { UserinfoService } from '../userinfo.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdhocService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [AdhocService, UserinfoService],
    imports: [HttpClientModule, RouterTestingModule]
  }));

  it('should be created', () => {
    const service: AdhocService = TestBed.get(AdhocService, UserinfoService);
    expect(service).toBeTruthy();
  });
});
