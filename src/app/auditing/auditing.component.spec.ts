import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditingComponent } from './auditing.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DataTablesModule } from 'angular-datatables';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserWorkspaceService } from '../user-workspace.service';
import { AuditService } from './audit.service';
import { UserinfoService } from '../userinfo.service';
import { UserProfileService } from '../user-profile/user-profile.service';
import {
  MatTableModule, MatDialog, MatDialogModule, MatSelectModule,
  MatOptionModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatSortModule, MatPaginatorModule, MatDatepickerModule, MatNativeDateModule
} from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';
import { NgxSpinnerService } from 'ngx-spinner';

describe('AuditingComponent', () => {
  let component: AuditingComponent;
  let fixture: ComponentFixture<AuditingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, MatDatepickerModule, MatNativeDateModule, BsDatepickerModule.forRoot(), MatTableModule, MatSelectModule, MatOptionModule, MatSortModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule, DataTablesModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [AuditingComponent, NavbarComponent],
      providers: [UserWorkspaceService, AuditService, NgxSpinnerService, UserinfoService, UserProfileService, { provide: EnvironmentService, useClass: MockEnvironmentService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
