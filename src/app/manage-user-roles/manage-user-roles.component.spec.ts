import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageUserRolesComponent } from './manage-user-roles.component';
import { By } from '@angular/platform-browser';
import { WorkspaceServicesComponent } from '../workspace-services/workspace-services.component';
import { RolePipe } from '../role.pipe';
import { ManageUserRolesService } from './manage-user-roles.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatTableModule, MatDialog, MatDialogModule, MatSelectModule,
  MatOptionModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatSortModule, MatPaginatorModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserinfoService } from '../userinfo.service';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';
describe('ManageUserRolesComponent', () => {
  let component: ManageUserRolesComponent;
  let fixture: ComponentFixture<ManageUserRolesComponent>;
  let testBedService: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageUserRolesComponent, RolePipe],
      imports: [RouterTestingModule, FormsModule, MatTableModule, MatSelectModule, MatOptionModule, MatSortModule, MatPaginatorModule,
        ReactiveFormsModule, HttpClientModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule,
        RouterTestingModule, MatDialogModule, HttpClientTestingModule],
        providers: [
          ManageUserRolesService,
          UserinfoService, { provide: EnvironmentService, useClass: MockEnvironmentService }
        ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
});
