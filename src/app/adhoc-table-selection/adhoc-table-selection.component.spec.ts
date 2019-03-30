import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocTableSelectionComponent } from './adhoc-table-selection.component';
import { TableListService } from '../table-list/table-list.service';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { ErtService } from '../ert-landing-page/ert.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AdhocTableSelectionComponent', () => {
  let component: AdhocTableSelectionComponent;
  let fixture: ComponentFixture<AdhocTableSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdhocTableSelectionComponent],
      providers: [TableListService, UserinfoService, WorkspaceHeaderService, ErtService],
      imports: [HttpClientModule, NgxPaginationModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhocTableSelectionComponent);
    component = fixture.componentInstance;
    const UIS = TestBed.get(WorkspaceHeaderService);
    spyOn(UIS, 'getSelectedWorkspaceId').and.returnValue('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});