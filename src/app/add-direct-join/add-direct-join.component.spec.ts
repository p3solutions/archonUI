import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDirectJoinComponent } from './add-direct-join.component';
import { AddDirectJoinService } from './add-direct-join.service';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SecondaryColumnPipe } from '../secondary-column.pipe';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatTableModule, MatSelectModule, MatPaginatorModule, } from '@angular/material';
import { SearchPipe } from '../search.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { TableListService } from '../table-list/table-list.service';

describe('AddDirectJoinComponent', () => {
  let component: AddDirectJoinComponent;
  let fixture: ComponentFixture<AddDirectJoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddDirectJoinComponent, SecondaryColumnPipe, SearchPipe],
      imports: [HttpClientModule, RouterTestingModule, FormsModule, MatFormFieldModule, MatSelectModule, NgxPaginationModule, MatTableModule, MatPaginatorModule],
      providers: [AddDirectJoinService, UserinfoService, TableListService,
        { provide: EnvironmentService, useClass: MockEnvironmentService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDirectJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
