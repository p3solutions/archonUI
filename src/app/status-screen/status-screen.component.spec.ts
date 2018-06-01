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
import { Observable } from 'rxjs/Observable';
import { jobArray, jobOriginArray, jobStatusArray } from '../hardcoded-collection';
import { By } from 'selenium-webdriver';
import { DebugElement } from '@angular/core';
import { Locator } from 'protractor';

describe('StatusScreenComponent', () => {
  let debugElement: DebugElement;
  let component: StatusScreenComponent;
  let fixture: ComponentFixture<StatusScreenComponent>;
  let testBedService: any;
  const loggedInAccessToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYmFkbWluQHRlc3QuY29tIiwicm9sZXMiOlt7InJvbGVJZCI6IjVhYzVjNmJkYTU0Z' +
  'Dc1MDNhNmI4MDkxOSIsInJvbGVOYW1lIjoiUk9MRV9EQl9BRE1JTiJ9XSwidXNlciI6eyJuYW1lIjoiZGJhZG1pbiIsImlkIjoiNWFjNWRjNjUyZTZjOTkwODYxODM' +
  'wOTc3IiwiZW1haWxBZGRyZXNzIjoiZGJhZG1pbkB0ZXN0LmNvbSJ9LCJpc3MiOiJhcHBsaWNhdGlvbiIsImlhdCI6MTUyNzY4Nzc5MiwiZXhwIjoxNTI3Nzc0MTkyfQ' +
  '.822cmi5CYPIHFgMba7D-LwsdLvFpphMw6FdU8FAs6RYdGKXtr36EugH_EUCbqxccjCAx4EwUBW9swXDSTRjiWA';
  localStorage.setItem('accessToken', loggedInAccessToken); // inserting logged in user info

  const getSimpleObservable = function(data) {
    return new Observable<any>((observer) => {
      observer.next(data); // observable execution
      observer.complete();
    });
  };

  const disposeMe = new Map();
  const getJobList = function (): Observable<any> {
    const pvtObservable = getSimpleObservable(jobArray);
    disposeMe.set('getJobList', pvtObservable.subscribe());
    return pvtObservable;
  };
  const getJobOrigins = function (): Observable<any> {
    const pvtObservable = getSimpleObservable(jobOriginArray);
    disposeMe.set('getJobOrigins', pvtObservable.subscribe());
    return pvtObservable;
  };
  const getJobStatuses = function (): Observable<any> {
    const pvtObservable = getSimpleObservable(jobStatusArray);
    disposeMe.set('getJobStatuses', pvtObservable.subscribe());
    return pvtObservable;
  };

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('StatusService injected via inject(...) and TestBed.get(...) should be the same instance',
    inject([StatusService], (injectService: StatusService) => {
      expect(injectService).toBe(testBedService);
    })
  );

  // DataTable is not created at runtime, hence not expecting data from html elements,
  // just expecting before & after function calls

  it('Should contain the jobOriginList as response when getJobOrigins() is called', () => {
    expect(component.jobOriginList.length === 0).toBeTruthy();
    spyOn(testBedService, 'getJobOrigins').and.returnValue(getJobOrigins());
    component.getJobOrigins();
    fixture.detectChanges();
    expect(component.jobOriginList.length > 0).toBeTruthy();
    disposeMe.get('getJobOrigins').unsubscribe();
  });

  it('Should contain the jobStatusList as response when getJobStatuses() is called', () => {
    expect(component.jobStatusList.length === 0).toBeTruthy();
    spyOn(testBedService, 'getJobStatuses').and.returnValue(getJobStatuses());
    component.getJobStatuses();
    fixture.detectChanges();
    expect(component.jobStatusList.length > 0).toBeTruthy();
    disposeMe.get('getJobOrigins').unsubscribe();
  });

  it('Should contain the job-list as response when getJobList() is called, then all the filters avilable', () => {
    expect(component.jobList.length === 0).toBeTruthy();
    spyOn(testBedService, 'getJobList').and.returnValue(getJobList());
    component.loadStatus = true;
    component.getJobList();
    fixture.detectChanges();
    expect(component.jobList.length > 0).toBeTruthy();

    // testing first dropdown of filter JobStatus
    spyOn(testBedService, 'getJobStatuses').and.returnValue(getJobStatuses());
    component.getJobStatuses();
    fixture.detectChanges();
    const jStatus = document.querySelector('.j-status');
    expect(jStatus.textContent).toBe(component.jobStatusList[0]);

    // testing first dropdown of filter JobOrigin
    spyOn(testBedService, 'getJobOrigins').and.returnValue(getJobOrigins());
    component.getJobOrigins();
    fixture.detectChanges();
    const jOrigin = document.querySelector('.j-origin');
    expect(jOrigin.textContent).toBe(component.jobOriginList[0]);

    // testing for searchBox existence
    const searchBox = document.querySelector('#job-search-box');
    expect(searchBox).toBeTruthy();

    disposeMe.get('getJobOrigins').unsubscribe();
    disposeMe.get('getJobOrigins').unsubscribe();
    disposeMe.get('getJobList').unsubscribe();
  });

});
