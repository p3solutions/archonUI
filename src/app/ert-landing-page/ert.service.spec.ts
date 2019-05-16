import { TestBed } from '@angular/core/testing';

import { ErtService } from './ert.service';
import { UserinfoService } from '../userinfo.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';

describe('ErtService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ErtService, UserinfoService,{ provide: EnvironmentService, useClass: MockEnvironmentService }],
    imports: [HttpClientModule, RouterTestingModule]

  }));

  it('should be created', () => {
    const service: ErtService = TestBed.get(ErtService);
    expect(service).toBeTruthy();
  });
});
