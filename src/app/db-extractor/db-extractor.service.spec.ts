import { TestBed } from '@angular/core/testing';
import { DbExtractorService } from './db-extractor.service';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { RouterTestingModule } from '@angular/router/testing';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';

describe('DbExtractorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [DbExtractorService, UserinfoService, { provide: EnvironmentService, useClass: MockEnvironmentService }],
    imports: [HttpClientModule, RouterTestingModule]
  }));

  it('should be created', () => {
    const service: DbExtractorService = TestBed.get(DbExtractorService, UserinfoService);
    expect(service).toBeTruthy();
  });
});
