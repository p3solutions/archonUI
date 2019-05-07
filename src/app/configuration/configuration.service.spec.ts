import { TestBed } from '@angular/core/testing';

import { ConfigurationService } from './configuration.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserinfoService } from '../userinfo.service';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';

describe('ConfigurationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [UserinfoService, { provide: EnvironmentService, useClass: MockEnvironmentService }],
    imports: [RouterTestingModule, HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: ConfigurationService = TestBed.get(ConfigurationService);
    expect(service).toBeTruthy();
  });
});
