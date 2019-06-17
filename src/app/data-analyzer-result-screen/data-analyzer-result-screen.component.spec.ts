import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAnalyzerResultScreenComponent } from './data-analyzer-result-screen.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TableListService } from '../table-list/table-list.service';
import { AddDirectJoinService } from '../add-direct-join/add-direct-join.service';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { RouterTestingModule } from '@angular/router/testing';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatCheckboxModule, MatExpansionModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DataAnalyzerResultScreenComponent', () => {
  let component: DataAnalyzerResultScreenComponent;
  let fixture: ComponentFixture<DataAnalyzerResultScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataAnalyzerResultScreenComponent ],
      imports: [NgxPaginationModule, HttpClientModule, RouterTestingModule, MatTableModule, MatPaginatorModule, MatSortModule, MatCheckboxModule, MatExpansionModule, BrowserAnimationsModule],
      providers: [TableListService, AddDirectJoinService, UserinfoService, { provide: EnvironmentService, useClass: MockEnvironmentService }],
      schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAnalyzerResultScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
