import { ManageMembersComponent } from './manage-members.component';
import { ManageMembers } from '../managemembers';
import { ManageMembersService } from '../manage-members.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { RouterTestingModule } from '@angular/router/testing';
import { WorkspaceServicesComponent } from '../workspace-services/workspace-services.component';

describe('ManageMembersComponent', () => {
  let component: ManageMembersComponent;
  let fixture: ComponentFixture<ManageMembersComponent>;
  let de: DebugElement;
  let ManageMembersInfoTag: HTMLElement;
  let manageMembersService: any;
  const managemembers1: any = [{ sl_no: '1', member: '2.0', role: 'need to be filled' },
  { sl_no: '2', member: '2.0', role: 'need to be filled' },
  { sl_no: '3', member: '2.0', role: 'need to be filled' },
  { sl_no: '4', member: '2.0', role: 'need to be filled' },
  { sl_no: '5', member: '2.0', role: 'need to be filled' }];
  const simpleObservable = new Observable<ManageMembers>((observer) => {
    observer.next(managemembers1);
    observer.complete();
  });
  const disposeMe = simpleObservable.subscribe();

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ManageMembersComponent],
      providers: [
        RouterTestingModule,
        ManageMembersService,
        HttpClientModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMembersComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('#manager-members'));
    ManageMembersInfoTag = de.nativeElement;
    manageMembersService = TestBed.get(ManageMembersService);
  });

  it('Should display the observable data for manage-members componenet', () => {
    spyOn(manageMembersService, 'getManageMembersDetails').and.returnValue(simpleObservable);
    fixture.detectChanges();
    const rowArray: NodeListOf<Element> = ManageMembersInfoTag.querySelectorAll('.mm-info-data');
    const sl_no = rowArray[0];
    const member = rowArray[1];
    const role = rowArray[2];
    expect(sl_no.textContent.trim()).toBe(component.manageMembersRequestData[0].sl_no);
    expect(member.textContent.trim()).toBe(component.manageMembersRequestData[0].member);
    expect(role.textContent.trim()).toBe(component.manageMembersRequestData[0].role);
  });
// this shouldn't be executed on production
  it('Should work the delete functionality, by deleting one member-info', () => {
    spyOn(manageMembersService, 'getManageMembersDetails').and.returnValue(simpleObservable);
    fixture.detectChanges();
    expect(component.onDelete).toBeTruthy();
    let delButtons = fixture.debugElement.queryAll(By.css('.del-member-info'));
    const btnsBeforeDel = delButtons.length;
    component.onDelete(0); // calling on first member-info
    fixture.detectChanges();
    delButtons = fixture.debugElement.queryAll(By.css('.del-member-info'));
    const btnsAfterDel = delButtons.length;
    expect(btnsBeforeDel - 1).toBe(btnsAfterDel);
    disposeMe.unsubscribe();
  });

  // ToDo: revisit again
  xit('Should navigate to dashboard', () => {
    component.gotoDashboard();
    fixture.detectChanges();
    // find DebugElements with an attached WorkspaceServicesComponentDirective
    const workspaceServiceTag = fixture.debugElement
      .queryAll(By.css('app-workspace-services'));
    console.log('workspaceServiceTag', workspaceServiceTag);
    // get the attached link directive instances using the DebugElement injectors
    const links = workspaceServiceTag
      .map(dE => dE.injector.get(WorkspaceServicesComponent) as WorkspaceServicesComponent);
    console.log('links', links);
    const dashboardUrl = 'workspace/workspace-dashboard/workspace-services';
    // expect(links[1].navigatedTo).toBe(dashboardUrl);
  });
});

