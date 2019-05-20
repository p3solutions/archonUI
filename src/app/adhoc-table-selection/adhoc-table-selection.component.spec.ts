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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from '../search.pipe';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';
import { CookieService } from 'ngx-cookie-service';

describe('AdhocTableSelectionComponent', () => {
  let component: AdhocTableSelectionComponent;
  let fixture: ComponentFixture<AdhocTableSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdhocTableSelectionComponent, SearchPipe],
      providers: [TableListService, UserinfoService, WorkspaceHeaderService, CookieService,
         ErtService, { provide: EnvironmentService, useClass: MockEnvironmentService }],
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule, NgxPaginationModule, RouterTestingModule],
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
