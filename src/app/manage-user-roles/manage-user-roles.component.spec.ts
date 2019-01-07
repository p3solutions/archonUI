import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageUserRolesComponent } from './manage-user-roles.component';
import { By } from '@angular/platform-browser';
import { WorkspaceServicesComponent } from '../workspace-services/workspace-services.component';
import { RolePipe } from '../role.pipe';
import { ChangeUserRoleComponent } from '../change-user-role/change-user-role.component';
import { ChangeUserRoleService } from '../change-user-role/change-user-role.service';
import { ManageUserRolesService } from './manage-user-roles.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';
describe('ManageUserRolesComponent', () => {
  let component: ManageUserRolesComponent;
  let fixture: ComponentFixture<ManageUserRolesComponent>;
  let testBedService: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageUserRolesComponent, RolePipe, ChangeUserRoleComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, DataTablesModule],
      providers: [
        ChangeUserRoleService,
        ManageUserRolesService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUserRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testBedService = TestBed.get(ManageUserRolesService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ToDo: revisit again
  it('Should navigate to dashboard', () => {
    component.gotoDashboard();
    fixture.detectChanges();
    // find DebugElements with an attached WorkspaceServicesComponentDirective
    const workspaceServiceTag = fixture.debugElement
      .queryAll(By.css('app-workspace-services'));
    // get the attached link directive instances using the DebugElement injectors
    const links = workspaceServiceTag
      .map(dE => dE.injector.get(WorkspaceServicesComponent) as WorkspaceServicesComponent);
    const dashboardUrl = 'workspace/workspace-dashboard/workspace-services';
    // expect(links[1].navigatedTo).toBe(dashboardUrl);
  });
});
