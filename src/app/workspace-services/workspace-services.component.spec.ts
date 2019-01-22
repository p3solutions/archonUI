import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceServicesComponent } from './workspace-services.component';
import { RouterTestingModule } from '@angular/router/testing';
import { WorkspaceServicesService } from './workspace-services.service';
import { UserinfoService } from '../userinfo.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { MetalyzerHeaderService } from '../metalyzer-header/metalyzer-header.service';
import { TableListService } from '../table-list/table-list.service';
import { CommonUtilityService } from '../common-utility.service';

describe('WorkspaceServicesComponent', () => {
  let component: WorkspaceServicesComponent;
  let fixture: ComponentFixture<WorkspaceServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ WorkspaceServicesComponent ],
      providers: [WorkspaceServicesService, UserinfoService,
        WorkspaceHeaderService, MetalyzerHeaderService, TableListService, CommonUtilityService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
