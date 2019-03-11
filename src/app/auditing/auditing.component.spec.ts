import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditingComponent } from './auditing.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import {BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DataTablesModule } from 'angular-datatables';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserWorkspaceService } from '../user-workspace.service';
import { AuditService } from './audit.service';
import { UserinfoService } from '../userinfo.service';
import { UserProfileService } from '../user-profile/user-profile.service';

describe('AuditingComponent', () => {
  let component: AuditingComponent;
  let fixture: ComponentFixture<AuditingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule , BsDatepickerModule.forRoot(),  DataTablesModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [ AuditingComponent, NavbarComponent ] ,
      providers: [UserWorkspaceService, AuditService, UserinfoService, UserProfileService]
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
