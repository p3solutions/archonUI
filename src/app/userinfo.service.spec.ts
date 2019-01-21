import { TestBed, inject } from '@angular/core/testing';
import { UserinfoService } from './userinfo.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('UserinfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      providers: [UserinfoService]
    });
  });

  it('should be created', inject([UserinfoService], (service: UserinfoService) => {
    expect(service).toBeTruthy();
  }));
});
