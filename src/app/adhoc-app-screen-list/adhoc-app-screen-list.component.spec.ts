import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdhocAppScreenListComponent } from './adhoc-app-screen-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatDialog, MatDialogModule, MatSelectModule,
   MatOptionModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AdhocService } from '../adhoc-landing-page/adhoc.service';
import { UserinfoService } from '../userinfo.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AdhocAppScreenListComponent', () => {
  let component: AdhocAppScreenListComponent;
  let fixture: ComponentFixture<AdhocAppScreenListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdhocAppScreenListComponent],
      providers: [WorkspaceHeaderService, AdhocService, UserinfoService],
      imports: [FormsModule, MatTableModule, MatSelectModule, MatOptionModule,
        ReactiveFormsModule, HttpClientModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule,
        RouterTestingModule, MatDialogModule],
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
