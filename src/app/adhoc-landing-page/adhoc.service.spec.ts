import { TestBed } from '@angular/core/testing';

import { AdhocService } from './adhoc.service';
import { Adhoc } from './adhoc';
import { UserinfoService } from '../userinfo.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';

describe('AdhocService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [AdhocService, UserinfoService,{ provide: EnvironmentService, useClass: MockEnvironmentService }],
    imports: [HttpClientModule, RouterTestingModule]
  }));

  it('should be created', () => {
    const service: AdhocService = TestBed.get(AdhocService, UserinfoService);
    expect(service).toBeTruthy();
  });
});
