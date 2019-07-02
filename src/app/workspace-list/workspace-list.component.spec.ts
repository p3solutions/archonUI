import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { WorkspaceListComponent } from './workspace-list.component';
import { WorkspaceListService } from './workspace-list.service';
import { DynamicLoaderService } from '../dynamic-loader.service';
import { UserinfoService } from '../userinfo.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonUtilityService } from '../common-utility.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { SearchPipe } from '../search.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatCardModule, MatInputModule, MatProgressBarModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';
import { NgxSpinnerService } from 'ngx-spinner';

// Reason: Object Event Error Thrown
describe('WorkspaceListComponent', () => {
  let component: WorkspaceListComponent;
  let fixture: ComponentFixture<WorkspaceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorkspaceListComponent, SearchPipe],
      imports: [HttpClientModule, RouterTestingModule, MatFormFieldModule,
        MatCardModule, MatInputModule, BrowserAnimationsModule, FormsModule, MatProgressBarModule],
      providers: [WorkspaceListService, DynamicLoaderService, UserinfoService,
        WorkspaceHeaderService, CommonUtilityService, NgxSpinnerService, { provide: EnvironmentService, useClass: MockEnvironmentService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceListComponent);
    component = fixture.componentInstance;
    const WHS = TestBed.get(WorkspaceHeaderService);
    spyOn(WHS, 'getSelectedWorkspaceId').and.returnValue('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
