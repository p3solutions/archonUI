import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErtDatarecordConfigComponent } from './ert-datarecord-config.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TableListService } from '../table-list/table-list.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { ErtService } from '../ert-landing-page/ert.service';
import { UserinfoService } from '../userinfo.service';

describe('ErtDatarecordConfigComponent', () => {
  let component: ErtDatarecordConfigComponent;
  let fixture: ComponentFixture<ErtDatarecordConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErtDatarecordConfigComponent ],
      providers: [TableListService, UserinfoService, WorkspaceHeaderService, ErtService],
      imports: [HttpClientModule, RouterTestingModule]
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
