import { TestBed } from '@angular/core/testing';

import { ResetpasswordService } from './resetpassword.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';
import { TableListService } from '../table-list/table-list.service';

describe('ResetpasswordService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule, HttpClientTestingModule],
    providers: [
      TableListService,
      HttpClientTestingModule, { provide: EnvironmentService, useClass: MockEnvironmentService }]
  }));

  it('should be created', () => {
    const service: ResetpasswordService = TestBed.get(ResetpasswordService);
    expect(service).toBeTruthy();
  });
});
