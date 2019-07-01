import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ErtDatarecordConfigComponent } from './ert-datarecord-config.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TableListService } from '../table-list/table-list.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { ErtService } from '../ert-landing-page/ert.service';
import { UserinfoService } from '../userinfo.service';
import { SearchPipe } from '../search.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

describe('ErtDatarecordConfigComponent', () => {
  let component: ErtDatarecordConfigComponent;
  let fixture: ComponentFixture<ErtDatarecordConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErtDatarecordConfigComponent, SearchPipe],
      providers: [TableListService, UserinfoService, WorkspaceHeaderService, ErtService, NgxSpinnerService,
        { provide: EnvironmentService, useClass: MockEnvironmentService }],
      imports: [FormsModule, HttpClientModule, RouterTestingModule, NgxPaginationModule, NgxSpinnerModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErtDatarecordConfigComponent);
    component = fixture.componentInstance;
    const UIS = TestBed.get(WorkspaceHeaderService);
    spyOn(UIS, 'getSelectedWorkspaceId').and.returnValue('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
