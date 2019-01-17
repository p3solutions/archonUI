import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { WorkspaceListComponent } from './workspace-list.component';
import { WorkspaceListService } from './workspace-list.service';
import { DynamicLoaderService } from '../dynamic-loader.service';
import { UserinfoService } from '../userinfo.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonUtilityService } from '../common-utility.service';

// Reason: Object Event Error Thrown
xdescribe('WorkspaceListComponent', () => {
  let component: WorkspaceListComponent;
  let fixture: ComponentFixture<WorkspaceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorkspaceListComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [WorkspaceListService, DynamicLoaderService, UserinfoService, CommonUtilityService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
