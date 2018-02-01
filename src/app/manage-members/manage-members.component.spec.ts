import { ManageMembersComponent } from './manage-members.component';
import { ManageMembers } from '../managemembers';
import { ManageMembersService } from './manage-members.service';
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
  const managemembers: any = [{ sl_no: '1', member: 'Admin User', role: 'ROLE_OWNER' },
  { sl_no: '2', member: 'Shammi Hans', role: 'ROLE_MEMBER' },
  { sl_no: '3', member: 'Deepak', role: 'ROLE_MEMBER' },
  { sl_no: '4', member: 'Alok', role: 'ROLE_MEMBER' }];
  const simpleObservable = new Observable<ManageMembers>((observer) => {
    observer.next(managemembers);
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
    spyOn(manageMembersService, 'getManageMembersData').and.returnValue(simpleObservable);
    fixture.detectChanges();
    const rowArray: NodeListOf<Element> = ManageMembersInfoTag.querySelectorAll('.mm-info-data');
    const member = rowArray[1];
    const role = rowArray[2];
    const workspaceAccess = component.manageMembers[0];
    expect(member.textContent.trim()).toBe(workspaceAccess.user.name);
    expect(role.textContent.trim()).toBe(workspaceAccess.workspaceRole.name);
  });
// this shouldn't be executed on production
  it('Should work the delete functionality, by deleting one member-info', () => {
    spyOn(manageMembersService, 'getManageMembersData').and.returnValue(simpleObservable);
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

