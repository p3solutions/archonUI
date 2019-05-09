import { TestBed, inject } from '@angular/core/testing';
import { MetalyzerHeaderService } from './metalyzer-header.service';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { RouterTestingModule } from '@angular/router/testing';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';


describe('MetalyzerHeaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MetalyzerHeaderService, UserinfoService, { provide: EnvironmentService, useClass: MockEnvironmentService }],
      imports: [HttpClientModule, RouterTestingModule]
    });
  });

  it('should be created', inject([MetalyzerHeaderService], (service: MetalyzerHeaderService) => {
    expect(service).toBeTruthy();
  }));
});
