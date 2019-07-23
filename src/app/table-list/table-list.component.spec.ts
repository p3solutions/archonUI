import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListComponent } from './table-list.component';
import { EditRelationshipInfoComponent } from '../edit-relationship-info/edit-relationship-info.component';
import { AddDirectJoinComponent } from '../add-direct-join/add-direct-join.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../search.pipe';
import { SecondaryColumnPipe } from '../secondary-column.pipe';
import { TableListService } from './table-list.service';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { EditRelationshipInfoService } from '../edit-relationship-info/edit-relationship-info.service';
import { AddDirectJoinService } from '../add-direct-join/add-direct-join.service';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DynamicLoaderService } from '../dynamic-loader.service';
import { MetalyzerHeaderService } from '../metalyzer-header/metalyzer-header.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';
import { MatExpansionModule } from '@angular/material';
import { WorkspaceServicesService } from '../workspace-services/workspace-services.service';
import { StatusService } from '../status-screen/status.service';

// Reason: Undefined Property
describe('TableListComponent', () => {
  let component: TableListComponent;
  let fixture: ComponentFixture<TableListComponent>;
  // let component1: EditRelationshipInfoComponent;
  // let fixture1: ComponentFixture<EditRelationshipInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableListComponent, SearchPipe,
        SecondaryColumnPipe],
      imports: [RouterTestingModule, FormsModule, HttpClientModule, NgxPaginationModule, MatExpansionModule],
      providers: [TableListService, UserinfoService, WorkspaceHeaderService,
        DynamicLoaderService, EditRelationshipInfoService, WorkspaceServicesService, StatusService,
        AddDirectJoinService, MetalyzerHeaderService, { provide: EnvironmentService, useClass: MockEnvironmentService }],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableListComponent);
    component = fixture.componentInstance;
    const Workspace = TestBed.get(WorkspaceHeaderService);
    spyOn(Workspace, 'getSelectedWorkspaceId').and.returnValue('');
    spyOn(Workspace, 'getMetalyzerServiceId').and.returnValue('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
