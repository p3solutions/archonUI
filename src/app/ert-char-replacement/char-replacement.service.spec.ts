import { TestBed } from '@angular/core/testing';

import { CharReplacementService } from './char-replacement.service';
import { UserinfoService } from '../userinfo.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('CharReplacementService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [UserinfoService],
    imports: [HttpClientModule, RouterTestingModule]
  }));

  it('should be created', () => {
    const service: CharReplacementService = TestBed.get(CharReplacementService);
    expect(service).toBeTruthy();
  });
});
