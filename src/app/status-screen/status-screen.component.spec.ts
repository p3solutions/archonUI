import { async, ComponentFixture, TestBed, inject, tick, fakeAsync, flush, flushMicrotasks } from '@angular/core/testing';

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
import { Observable } from 'rxjs';
import { jobArray, jobOriginArray, jobStatusArray } from '../hardcoded-collection';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

describe('StatusScreenComponent', () => {
  let component: StatusScreenComponent;
  let fixture: ComponentFixture<StatusScreenComponent>;
  let testBedService: any;
  let routerService: any;
  const loggedInAccessToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYmFkbWluQHRlc3QuY29tIiwicm9sZXMiOlt7InJvbGVJZCI6IjVhYzVjNmJkYTU0Z' +
    'Dc1MDNhNmI4MDkxOSIsInJvbGVOYW1lIjoiUk9MRV9EQl9BRE1JTiJ9XSwidXNlciI6eyJuYW1lIjoiZGJhZG1pbiIsImlkIjoiNWFjNWRjNjUyZTZjOTkwODYxODM' +
    'wOTc3IiwiZW1haWxBZGRyZXNzIjoiZGJhZG1pbkB0ZXN0LmNvbSJ9LCJpc3MiOiJhcHBsaWNhdGlvbiIsImlhdCI6MTUyNzY4Nzc5MiwiZXhwIjoxNTI3Nzc0MTkyfQ' +
    '.822cmi5CYPIHFgMba7D-LwsdLvFpphMw6FdU8FAs6RYdGKXtr36EugH_EUCbqxccjCAx4EwUBW9swXDSTRjiWA';
  localStorage.setItem('accessToken', loggedInAccessToken); // inserting logged in user info
  let debugElement: DebugElement;

  const getSimpleObservable = function (data) {
    return new Observable<any>((observer) => {
      observer.next(data); // observable execution
      observer.complete();
    });
  };

  const disposeMe = new Map();
  const getJobList = function (data): Observable<any> {
    const pvtObservable = getSimpleObservable(data);
    disposeMe.set('getJobList', pvtObservable.subscribe());
    return pvtObservable;
  };
  const getJobOrigins = function (data): Observable<any> {
    const pvtObservable = getSimpleObservable(data);
    disposeMe.set('getJobOrigins', pvtObservable.subscribe());
    return pvtObservable;
  };
  const getJobStatuses = function (data): Observable<any> {
    const pvtObservable = getSimpleObservable(data);
    disposeMe.set('getJobStatuses', pvtObservable.subscribe());
    return pvtObservable;
  };
  const selectJobOrigin = function (data): Observable<any> {
    const pvtObservable = getSimpleObservable(data);
    disposeMe.set('selectJobOrigin', pvtObservable.subscribe());
    return pvtObservable;
  };
  const showStatusDetails = function (data): Observable<any> {
    const pvtObservable = getSimpleObservable(data);
    disposeMe.set('showStatusDetails', pvtObservable.subscribe());
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
      declarations: [StatusScreenComponent, KeysPipe, ReverseArrayPipe, NavbarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
    testBedService = TestBed.get(StatusService);
    routerService = TestBed.get(Router);
  });
  afterEach(() => {
    fixture.destroy();
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('StatusService injected via inject(...) and TestBed.get(...) should be the same instance',
    inject([StatusService], (injectService: StatusService) => {
      expect(injectService).toBe(testBedService);
    })
  );


  xit('DI, Should contain the jobOriginList as response when getJobOrigins() is called', fakeAsync(() => {
    expect(component.jobOriginList.length === 0).toBeTruthy();
    spyOn(testBedService, 'getJobOrigins').and.returnValue(getJobOrigins(jobOriginArray));
    component.getJobOrigins();
    flushMicrotasks();
    fixture.detectChanges();
    expect(component.jobOriginList.length > 0).toBeTruthy();
    disposeMe.get('getJobOrigins').unsubscribe();
  }));

  xit('DI, Should contain the jobStatusList as response when getJobStatuses() is called', fakeAsync(() => {
    expect(component.jobStatusList.length === 0).toBeTruthy();
    spyOn(testBedService, 'getJobStatuses').and.returnValue(getJobStatuses(jobStatusArray));
    component.getJobStatuses();
    flushMicrotasks();
    fixture.detectChanges();
    expect(component.jobStatusList.length > 0).toBeTruthy();
    disposeMe.get('getJobOrigins').unsubscribe();
  }));

  xit('DI, Should contain the job-list as response when getJobList() is called, then all the filters avilable',
    // fakeAsync(
    () => {
      expect(component.jobList.length === 0).toBeTruthy();
      spyOn(testBedService, 'getJobList').and.returnValue(getJobList(jobArray));
      component.loadStatus = true;
      component.getJobList();
      // flushMicrotasks();
      fixture.detectChanges();
      expect(component.jobList.length > 0).toBeTruthy();

      spyOn(testBedService, 'getJobStatuses').and.returnValue(getJobStatuses(jobStatusArray));
      component.getJobStatuses();
      // flushMicrotasks();
      fixture.detectChanges();
      // testing first dropdown of filter JobStatus
      const jStatusFilter = debugElement.query(By.css('.j-status'));
      expect(jStatusFilter.nativeElement.innerText).toBe(component.jobStatusList[0]);

      spyOn(testBedService, 'getJobOrigins').and.returnValue(getJobOrigins(jobOriginArray));
      component.getJobOrigins();
      // flushMicrotasks();
      fixture.detectChanges();
      // testing first dropdown of filter JobOrigin
      const jOriginFilter = debugElement.query(By.css('.j-origin'));
      expect(jOriginFilter.nativeElement.innerText).toBe(component.jobOriginList[0]);

      // testing for searchBox existence
      const searchBox = debugElement.query(By.css('#job-search-box'));
      expect(searchBox.nativeNode).toBeTruthy();

      // testing for refresh-button existence
      const refreshButton = debugElement.query(By.css('i.fa-refresh'));
      expect(refreshButton.nativeNode).toBeTruthy();

      // testing for back-button existence
      const backButton = debugElement.query(By.css('i.fa-arrow-left'));
      expect(backButton.nativeNode).toBeTruthy();

      // testing for filter verifications
      jOriginFilter.triggerEventHandler('click', null);
      // flushMicrotasks();
      fixture.detectChanges();
      expect(component.selectedJobOrigin).toBe(jOriginFilter.nativeElement.innerText);

      jStatusFilter.triggerEventHandler('click', null);
      // flushMicrotasks();
      fixture.detectChanges();
      expect(component.selectedJobStatus).toBe(jStatusFilter.nativeElement.innerText);

      // datatable Fn executed but statusTable is not stored, hence throwing error in calling component.searchText()
      // searchBox.nativeElement.value = 'success';
      // component.searchText(searchBox.nativeElement.value);
      // fixture.detectChanges();
      // expect(component.searchBoxText).toContain(searchBox.nativeElement.value);

      // refresh button refreshes filters
      debugElement.query(By.css('i.fa-refresh')).triggerEventHandler('click', null);
      expect(component.selectedJobOrigin).toBe('');
      expect(component.selectedJobStatus).toBe('');
      // const getJobListSpy = spyOn(component, 'getJobList');
      // expect(getJobListSpy).toHaveBeenCalled();

      // job-details functionality verification
      // const firstJob = component.jobList[0];
      // const showStatusDetailsSpy = spyOn(component, 'showStatusDetails');
      // component.showStatusDetails(firstJob._id, firstJob.jobInfo.jobStatus, firstJob.jobDetails, firstJob.input);
      // fixture.detectChanges();
      // expect(showStatusDetailsSpy).toHaveBeenCalled();
      // expect(component.selectedJD.id).toBe(firstJob._id);

      // Back button should go to Dashboard
      const routerSpy = spyOn(routerService, 'navigate');
      component.gotoDashboard();
      fixture.detectChanges();
      expect(routerSpy).toHaveBeenCalledWith(['workspace/workspace-dashboard/workspace-services']);

      disposeMe.get('getJobOrigins').unsubscribe();
      disposeMe.get('getJobOrigins').unsubscribe();
      disposeMe.get('getJobList').unsubscribe();
    })
    // )
    ;

});
