import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MemberRequestComponent } from './member-request.component';
import { MemberRequestService } from './member-request.service';
import { MemberRequestData } from '../member-request-data';
import { Observable } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';

describe('MemberRequestComponent', () => {
  let component: MemberRequestComponent;
  let fixture: ComponentFixture<MemberRequestComponent>;
  let de: DebugElement;
  let memberRequestHTMLTag: HTMLElement;
  let memberRequestService: any;

  const memberrequestMockData: any = [
    { slNo: '1', masterVersion: '1.01', description: 'Null', requestedDate: '20/11/2017 04.05 PM', requestedBy: 'Member 1' },
    { slNo: '2', masterVersion: '1.46', description: 'Null', requestedDate: '20/11/2017 04.05 PM', requestedBy: 'Member 2' },
    { slNo: '3', masterVersion: '2.46', description: 'Null', requestedDate: '20/11/2017 04.05 PM', requestedBy: 'Member 3' },
    { slNo: '4', masterVersion: '3.00', description: 'Null', requestedDate: '20/11/2017 04.05 PM', requestedBy: 'Member 4' },
    { slNo: '5', masterVersion: '4.69', description: 'Null', requestedDate: '20/11/2017 04.05 PM', requestedBy: 'Member 5' }
  ];
  const simpleObservable = new Observable<MemberRequestData[]>((observer) => {
    observer.next(memberrequestMockData);
    observer.complete();
  });
  const disposeMe = simpleObservable.subscribe();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule, RouterTestingModule],
      providers: [MemberRequestService, RouterTestingModule, { provide: EnvironmentService, useClass: MockEnvironmentService }],
      declarations: [MemberRequestComponent]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(MemberRequestComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('#member-request'));
    memberRequestHTMLTag = de.nativeElement;
    memberRequestService = TestBed.get(MemberRequestService);
  });
  it('Should display the observable data for member-request component', () => {
    spyOn(memberRequestService, 'getMemberRequestDetails').and.returnValue(simpleObservable);
    fixture.detectChanges();
    const rowArray: NodeListOf<Element> = memberRequestHTMLTag.querySelectorAll('.mem-req-data');
    expect(rowArray[0].textContent.trim()).toBe(component.memberRequestData[0].slNo);
    expect(rowArray[1].textContent.trim()).toBe(component.memberRequestData[0].masterVersion);
    expect(rowArray[2].textContent.trim()).toBe(component.memberRequestData[0].description);
  });
});
