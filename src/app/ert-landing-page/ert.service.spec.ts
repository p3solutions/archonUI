import { TestBed } from '@angular/core/testing';

import { ErtService } from './ert.service';
import { UserinfoService } from '../userinfo.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('ErtService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ErtService, UserinfoService],
    imports: [HttpClientModule, RouterTestingModule]

  }));

  it('should be created', () => {
    const service: ErtService = TestBed.get(ErtService);
    expect(service).toBeTruthy();
  });
});
