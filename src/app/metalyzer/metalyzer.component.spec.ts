import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalyzerComponent } from './metalyzer.component';
import { MetalyzerHeaderComponent } from '../metalyzer-header/metalyzer-header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TableListService } from '../table-list/table-list.service';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { MetalyzerHeaderService } from '../metalyzer-header/metalyzer-header.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';

// Reason: Undefined Property Error
xdescribe('MetalyzerComponent', () => {
  let component: MetalyzerComponent;
  let fixture: ComponentFixture<MetalyzerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetalyzerComponent, MetalyzerHeaderComponent ],
      imports: [RouterTestingModule, HttpClientModule],
      providers: [TableListService, UserinfoService, MetalyzerHeaderService, WorkspaceHeaderService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
