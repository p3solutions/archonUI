import { TestBed } from '@angular/core/testing';

import { EnvironmentService } from './environment.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockEnvironmentService } from './mock-environment.service';

describe('EnvironmentService', () => {
  
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      HttpClientModule, { provide: EnvironmentService, useClass: MockEnvironmentService }
    ],
  }));

  it('should be created', () => {
    const service: EnvironmentService = TestBed.get(EnvironmentService);
    expect(service).toBeTruthy();
  });
});
