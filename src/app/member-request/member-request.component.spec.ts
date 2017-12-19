import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MemberRequestComponent } from './member-request.component';
import { MemberRequestService } from '../member-request.service';
import { MemberRequestData } from '../member-request-data';
import { Observable } from 'rxjs/Observable';


describe('MemberRequestComponent', () => {
  let component: MemberRequestComponent;
  let fixture: ComponentFixture<MemberRequestComponent>;
  let memberrequestData: MemberRequestData;
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
  let disposeMe;
  const getMemberRequest = function (): Observable<MemberRequestData[]> {
    disposeMe = simpleObservable.subscribe();
    return simpleObservable;
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [MemberRequestService],
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
    spyOn(memberRequestService, 'getMemberRequestDetails').and.returnValue(getMemberRequest());
    // fixture.detectChanges();
    fixture.detectChanges();
    const rowArray: NodeListOf<Element> = memberRequestHTMLTag.querySelectorAll('.mem-req-data');
    const sl_no = rowArray[0];
    const masterVersion = rowArray[1];
    const description = rowArray[2];
    expect(sl_no.textContent.trim()).toBe(component.memberRequestData[0].slNo);
    expect(masterVersion.textContent.trim()).toBe(component.memberRequestData[0].masterVersion);
    expect(description.textContent.trim()).toBe(component.memberRequestData[0].description);

  });
});
