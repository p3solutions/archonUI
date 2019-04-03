import { TestBed } from '@angular/core/testing';

import { ConfigurationService } from './configuration.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserinfoService } from '../userinfo.service';

describe('ConfigurationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [UserinfoService],
    imports: [RouterTestingModule, HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: ConfigurationService = TestBed.get(ConfigurationService);
    expect(service).toBeTruthy();
  });
});
