import { ManageMembersComponent } from './manage-members.component';
import { ManageMembers } from '../managemembers';
// import { WorkspaceInfoComponent } from './workspace-info.component';
// import { WorkspaceinfoService } from '../workspaceinfo.service';
import { ManageMembersService } from '../manage-members.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
// import { RouterTestingModule } from '@angular/router/testing';
// import { Router } from '@angular/router';

xdescribe('ManageMembersComponent', () => {
  let component: ManageMembersComponent;
  let fixture: ComponentFixture<ManageMembersComponent>;
  // tslint:disable-next-line:prefer-const
  let manageMemberInfoData: ManageMembers;
  let de: DebugElement;
  let btn: DebugElement;
  let ManageMembersInfoTag: HTMLElement;
  let manageMembersService: any;
  const managemembers1: any = [{ sl_no: '1', member: '2.0', role: 'need to be filled' },
  { sl_no: '2', member: '2.0', role: 'need to be filled' },
  { sl_no: '3', member: '2.0', role: 'need to be filled' },
  { sl_no: '4', member: '2.0', role: 'need to be filled' },
  { sl_no: '5', member: '2.0', role: 'need to be filled' }];
  const simpleObservable = new Observable<ManageMembers>((observer) => {
    // observable execution
    observer.next(managemembers1);
    observer.complete();
  });
  let disposeMe;
  const getManageMembersData = function (): Observable<ManageMembers> {
    disposeMe = simpleObservable.subscribe();
    return simpleObservable;
  };

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      declarations: [ManageMembersComponent],
      providers: [
        // RouterTestingModule,
        ManageMembersService,
        HttpClientModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMembersComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('#manage-members-info-table'));
    btn = fixture.debugElement.query(By.css('span'));
    ManageMembersInfoTag = de.nativeElement;
    manageMembersService = TestBed.get(ManageMembersService);
  });

  it('Should display the observable data for manage-members componenet', () => {
    spyOn(manageMembersService, 'getManageMembersDetails').and.returnValue(getManageMembersData());
    // component.getManageMembersData();
    fixture.detectChanges();
    const rowArray: NodeListOf<Element> = ManageMembersInfoTag.querySelectorAll('.mm-info-data');
    // while spying on real service, mocked info is returned

    console.log(rowArray[0], component.manageMembersRequestData);
    const sl_no = rowArray[0];
    const member = rowArray[1];
    const role = rowArray[2];

    expect(sl_no.textContent.trim()).toBe(component.manageMembersRequestData[0].sl_no);
    expect(member.textContent.trim()).toBe(component.manageMembersRequestData[0].member);
    expect(role.textContent.trim()).toBe(component.manageMembersRequestData[0].role);

  });

  it('Should work the delete functionality', () => {
    // let btn = fixture.debugElement.query(By.css('button'));
    // btn.triggerEventHandler('click', null);
    expect(component.onDelete).toBeTruthy();
  });
});

