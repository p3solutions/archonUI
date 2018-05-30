import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { StatusScreenComponent } from './status-screen.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StatusService } from './status.service';
import { KeysPipe } from '../keys.pipe';
import { ReverseArrayPipe } from '../reverse.pipe';
import { WorkspaceServicesService } from '../workspace-services/workspace-services.service';
import { UserinfoService } from '../userinfo.service';
import { CommonUtilityService } from '../common-utility.service';

describe('StatusScreenComponent', () => {
  let component: StatusScreenComponent;
  let fixture: ComponentFixture<StatusScreenComponent>;
  let testBedService: any;
  const loggedInAccessToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYmFkbWluQHRlc3QuY29tIiwicm9sZXMiOlt7InJvbGVJZCI6IjVhYzVjNmJkYTU0Z' +
  'Dc1MDNhNmI4MDkxOSIsInJvbGVOYW1lIjoiUk9MRV9EQl9BRE1JTiJ9XSwidXNlciI6eyJuYW1lIjoiZGJhZG1pbiIsImlkIjoiNWFjNWRjNjUyZTZjOTkwODYxODM' +
  'wOTc3IiwiZW1haWxBZGRyZXNzIjoiZGJhZG1pbkB0ZXN0LmNvbSJ9LCJpc3MiOiJhcHBsaWNhdGlvbiIsImlhdCI6MTUyNzY4Nzc5MiwiZXhwIjoxNTI3Nzc0MTkyfQ' +
  '.822cmi5CYPIHFgMba7D-LwsdLvFpphMw6FdU8FAs6RYdGKXtr36EugH_EUCbqxccjCAx4EwUBW9swXDSTRjiWA';
  localStorage.setItem('accessToken', loggedInAccessToken); // inserting logged in user info

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        HttpClientModule,
        StatusService,
        WorkspaceServicesService,
        UserinfoService,
        CommonUtilityService
      ],
      declarations: [StatusScreenComponent, KeysPipe, ReverseArrayPipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testBedService = TestBed.get(StatusService);
    console.log(component);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('StatusService injected via inject(...) and TestBed.get(...) should be the same instance',
    inject([StatusService], (injectService: StatusService) => {
      expect(injectService).toBe(testBedService);
    })
  );

});
