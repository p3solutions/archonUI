import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalyzerLandingPageComponent } from './metalyzer-landing-page.component';
import { MetalyzerHeaderComponent } from '../../metalyzer-header/metalyzer-header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TableListService } from '../../table-list/table-list.service';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../../userinfo.service';
import { MetalyzerHeaderService } from '../../metalyzer-header/metalyzer-header.service';
import { WorkspaceHeaderService } from '../../workspace-header/workspace-header.service';

describe('MetalyzerComponent', () => {
  let component: MetalyzerLandingPageComponent;
  let fixture: ComponentFixture<MetalyzerLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetalyzerLandingPageComponent, MetalyzerHeaderComponent ],
      imports: [RouterTestingModule, HttpClientModule],
      providers: [TableListService, UserinfoService, MetalyzerHeaderService, WorkspaceHeaderService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetalyzerLandingPageComponent);
    component = fixture.componentInstance;
    const Workspace = TestBed.get(WorkspaceHeaderService);
    spyOn(Workspace, 'getSelectedWorkspaceId').and.returnValue('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
