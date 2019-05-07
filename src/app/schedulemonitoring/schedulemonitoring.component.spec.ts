import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulemonitoringComponent } from './schedulemonitoring.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { DataTablesModule } from 'angular-datatables';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { UserProfileService } from '../user-profile/user-profile.service';
import { FormsModule } from '@angular/forms';
import {
  MatTableModule, MatDialog, MatDialogModule, MatSelectModule,
  MatOptionModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatSortModule, MatPaginatorModule
} from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';

describe('SchedulemonitoringComponent', () => {
  let component: SchedulemonitoringComponent;
  let fixture: ComponentFixture<SchedulemonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulemonitoringComponent , NavbarComponent],
      imports: [FormsModule, MatTableModule, MatSelectModule, MatOptionModule, MatSortModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule, DataTablesModule, RouterTestingModule, HttpClientTestingModule, HttpClientModule],
      providers: [UserinfoService, UserProfileService, { provide: EnvironmentService, useClass: MockEnvironmentService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulemonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
