import { TestBed } from '@angular/core/testing';
import { HttpClientModule} from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuditService } from './audit.service';
import { UserinfoService } from '../userinfo.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuditService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule, RouterTestingModule,
      HttpClientTestingModule
    ],
    providers: [UserinfoService]
  }));

  it('should be created', () => {
    const service: AuditService = TestBed.get(AuditService);
    expect(service).toBeTruthy();
  });
});
