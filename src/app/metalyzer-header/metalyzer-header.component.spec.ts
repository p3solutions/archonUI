import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalyzerHeaderComponent } from './metalyzer-header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { MetalyzerHeaderService } from './metalyzer-header.service';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';

describe('MetalyzerHeaderComponent', () => {
  let component: MetalyzerHeaderComponent;
  let fixture: ComponentFixture<MetalyzerHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetalyzerHeaderComponent ],
      imports: [RouterTestingModule, HttpClientModule],
      providers: [WorkspaceHeaderService, MetalyzerHeaderService, UserinfoService]
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
