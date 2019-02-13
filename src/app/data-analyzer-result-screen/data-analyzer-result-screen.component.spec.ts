import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAnalyzerResultScreenComponent } from './data-analyzer-result-screen.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TableListService } from '../table-list/table-list.service';
import { AddDirectJoinService } from '../add-direct-join/add-direct-join.service';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('DataAnalyzerResultScreenComponent', () => {
  let component: DataAnalyzerResultScreenComponent;
  let fixture: ComponentFixture<DataAnalyzerResultScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataAnalyzerResultScreenComponent ],
      imports: [NgxPaginationModule, HttpClientModule, RouterTestingModule],
      providers: [TableListService, AddDirectJoinService, UserinfoService]
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
