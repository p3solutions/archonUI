import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdhocAppScreenListComponent } from './adhoc-app-screen-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatTableModule, MatDialog, MatDialogModule, MatSelectModule,
  MatOptionModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatSortModule, MatPaginatorModule, MatTooltipModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AdhocService } from '../adhoc-landing-page/adhoc.service';
import { UserinfoService } from '../userinfo.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';
import { CookieService } from 'ngx-cookie-service';
import { WorkspaceServicesService } from '../workspace-services/workspace-services.service';

describe('AdhocAppScreenListComponent', () => {
  let component: AdhocAppScreenListComponent;
  let fixture: ComponentFixture<AdhocAppScreenListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdhocAppScreenListComponent],
      providers: [WorkspaceHeaderService, AdhocService, UserinfoService , CookieService, WorkspaceServicesService,
        { provide: EnvironmentService, useClass: MockEnvironmentService }],
      imports: [FormsModule, MatTableModule, MatTooltipModule, MatSelectModule, MatOptionModule, MatSortModule, MatPaginatorModule,
        ReactiveFormsModule, HttpClientModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule,
        RouterTestingModule, MatDialogModule, MatMenuModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhocAppScreenListComponent);
    component = fixture.componentInstance;
    const WHS = TestBed.get(WorkspaceHeaderService);
    spyOn(WHS, 'getSelectedWorkspaceName').and.returnValue('');
    spyOn(WHS, 'getSelectedWorkspaceId').and.returnValue('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
