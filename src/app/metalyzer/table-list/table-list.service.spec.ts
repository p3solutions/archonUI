import { TestBed, inject } from '@angular/core/testing';

import { TableListService } from './table-list.service';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('TableListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableListService, UserinfoService],
      imports: [HttpClientModule, RouterTestingModule]
    });
  });

  it('should be created', inject([TableListService], (service: TableListService) => {
    expect(service).toBeTruthy();
  }));
});
