import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalyzerComponent } from './metalyzer.component';
import { MetalyzerHeaderComponent } from '../metalyzer-header/metalyzer-header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TableListService } from '../table-list/table-list.service';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { MetalyzerHeaderService } from '../metalyzer-header/metalyzer-header.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';
import { MatFormFieldModule, MatSelectModule,MatInputModule, MatTableModule, MatPaginatorModule, MatTooltipModule,MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { WorkspaceServicesService } from '../workspace-services/workspace-services.service';
import { DatePipe } from '@angular/common';

describe('MetalyzerComponent', () => {
  let component: MetalyzerComponent;
  let fixture: ComponentFixture<MetalyzerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MetalyzerComponent, MetalyzerHeaderComponent],
      imports: [RouterTestingModule, MatTableModule, HttpClientModule, MatTooltipModule,
        NgxPaginationModule, MatFormFieldModule, FormsModule, MatSelectModule,MatDatepickerModule, MatNativeDateModule,MatInputModule,
        BrowserAnimationsModule, MatPaginatorModule, NgxSpinnerModule],
      providers: [DatePipe,TableListService, UserinfoService, MetalyzerHeaderService, WorkspaceServicesService,
        WorkspaceHeaderService, { provide: EnvironmentService, useClass: MockEnvironmentService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetalyzerComponent);
    component = fixture.componentInstance;
    const Workspace = TestBed.get(WorkspaceHeaderService);
    spyOn(Workspace, 'getSelectedWorkspaceId').and.returnValue('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
