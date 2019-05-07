import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErtTableComponent } from './ert-table.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErtService } from '../ert-landing-page/ert.service';
import { UserinfoService } from '../userinfo.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { SearchPipe } from '../search.pipe';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';

describe('ErtTableComponent', () => {
  let component: ErtTableComponent;
  let fixture: ComponentFixture<ErtTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErtTableComponent, SearchPipe],
      imports: [FormsModule, ReactiveFormsModule, NgxPaginationModule, HttpClientModule, RouterTestingModule],
      providers: [UserinfoService, WorkspaceHeaderService, ErtService, { provide: EnvironmentService, useClass: MockEnvironmentService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErtTableComponent);
    component = fixture.componentInstance;
    const WHS = TestBed.get(WorkspaceHeaderService);
    spyOn(WHS, 'getSelectedWorkspaceId').and.returnValue('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
