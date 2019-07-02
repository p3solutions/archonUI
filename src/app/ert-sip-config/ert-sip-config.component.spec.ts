import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErtSipConfigComponent } from './ert-sip-config.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { ErtService } from '../ert-landing-page/ert.service';
import { TableListService } from '../table-list/table-list.service';
import { UserinfoService } from '../userinfo.service';
import { SearchPipe } from '../search.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';

describe('ErtSipConfigComponent', () => {
  let component: ErtSipConfigComponent;
  let fixture: ComponentFixture<ErtSipConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErtSipConfigComponent, SearchPipe],
      imports: [FormsModule, RouterTestingModule, HttpClientModule, NgxPaginationModule, NgxSpinnerModule],
      providers: [WorkspaceHeaderService, ErtService, TableListService, UserinfoService, NgxSpinnerService,
         { provide: EnvironmentService, useClass: MockEnvironmentService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErtSipConfigComponent);
    component = fixture.componentInstance;
    const WHS = TestBed.get(WorkspaceHeaderService);
    spyOn(WHS, 'getSelectedWorkspaceId').and.returnValue('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
