import { TestBed } from '@angular/core/testing';

import { EnvironmentService } from './environment.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EnvironmentService', () => {
  
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      HttpClientModule,
    ],
  }));

  it('should be created', () => {
    const service: EnvironmentService = TestBed.get(EnvironmentService);
    expect(service).toBeTruthy();
  });
});
