import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalyzerHeaderComponent } from './metalyzer-header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { MetalyzerHeaderService } from './metalyzer-header.service';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { TableListService } from '../table-list/table-list.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';
import { MatFormFieldModule, MatSelectModule, MatTableModule, MatPaginatorModule, MatTooltipModule,MatDatepickerModule, MatNativeDateModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkspaceServicesService } from '../workspace-services/workspace-services.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';

describe('MetalyzerHeaderComponent', () => {
  let component: MetalyzerHeaderComponent;
  let fixture: ComponentFixture<MetalyzerHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MetalyzerHeaderComponent],
      imports: [RouterTestingModule, HttpClientModule,MatInputModule, NgxPaginationModule, MatDatepickerModule, MatNativeDateModule,MatTableModule, MatTooltipModule, MatFormFieldModule,
        FormsModule, MatSelectModule, BrowserAnimationsModule, MatPaginatorModule],
      providers: [WorkspaceHeaderService, MetalyzerHeaderService, UserinfoService, TableListService, WorkspaceServicesService,DatePipe,
        { provide: EnvironmentService, useClass: MockEnvironmentService }],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetalyzerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
