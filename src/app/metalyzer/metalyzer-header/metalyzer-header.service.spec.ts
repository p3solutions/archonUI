import { TestBed, inject } from '@angular/core/testing';
import { MetalyzerHeaderService } from './metalyzer-header.service';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { RouterTestingModule } from '@angular/router/testing';


describe('MetalyzerHeaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MetalyzerHeaderService, UserinfoService],
      imports: [HttpClientModule, RouterTestingModule]
    });
  });

  it('should be created', inject([MetalyzerHeaderService], (service: MetalyzerHeaderService) => {
    expect(service).toBeTruthy();
  }));
});
